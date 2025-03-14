using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Milio.Models;
using Milio.Services;
using Milio.Services.Interfaces;
using System.IO;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IEmailService _emailService;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AuthController(IAuthService authService, IEmailService emailService, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
    {
        _authService = authService;
        _emailService = emailService;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromForm] RegisterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser != null)
            return BadRequest(new { Error = "Email вже використовується." });

        var user = new User
        {
            Email = request.Email,
            UserName = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            ResetToken = string.Empty
        };

        if (request.Avatar != null)
        {
            var avatarValidationResult = ValidateAvatar(request.Avatar);
            if (!avatarValidationResult.IsValid)
                return BadRequest(new { Error = avatarValidationResult.ErrorMessage });

            try
            {
                user.AvatarPath = await SaveAvatarAsync(request.Avatar);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Помилка завантаження файлу: {ex.Message}");
                return BadRequest(new { Error = "Не вдалося завантажити аватар." });
            }
        }

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            return BadRequest(new { Errors = errors });
        }

        if (!await _roleManager.RoleExistsAsync("User"))
        {
            await _roleManager.CreateAsync(new IdentityRole("User"));
        }

        var addToRoleResult = await _userManager.AddToRoleAsync(user, "User");
        if (!addToRoleResult.Succeeded)
        {
            var errors = string.Join(", ", addToRoleResult.Errors.Select(e => e.Description));
            return BadRequest(new { Error = $"Не вдалося додати користувача до ролі. Помилки: {errors}" });
        }

        return Ok(new
        {
            Message = "Користувач успішно зареєстрований.",
            User = new
            {
                user.FirstName,
                user.LastName,
                user.Email,
                user.AvatarPath
            }
        });
    }

    private async Task<string> SaveAvatarAsync(IFormFile avatar)
    {
        var uploadsFolder = Path.Combine("wwwroot", "avatars");
        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(avatar.FileName);
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await avatar.CopyToAsync(fileStream);
        }

        return "/avatars/" + uniqueFileName;
    }

    private (bool IsValid, string ErrorMessage) ValidateAvatar(IFormFile avatar)
    {
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
        var extension = Path.GetExtension(avatar.FileName).ToLower();

        if (!allowedExtensions.Contains(extension))
            return (false, "Формат файлу не підтримується. Дозволені формати: JPG, JPEG, PNG.");

        return (true, null);
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
            return Unauthorized(new { Error = "Невірний email або пароль." });

        var token = _authService.GenerateToken(user);

        return Ok(new
        {
            Token = token,
            User = new
            {
                user.Email
            }
        });
    }

    [HttpPost("forgot-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
            return BadRequest(new { Error = "Користувача з таким email не знайдено." });

        var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
        var hashedToken = _authService.HashToken(resetToken); // Хешування токена

        // Збереження хешованого токена у базу даних
        user.ResetTokenHash = hashedToken;
        user.ResetTokenExpiry = DateTime.UtcNow.AddHours(1); // Термін дії токена
        await _userManager.UpdateAsync(user);

        // Відправлення email з токеном
        await _emailService.SendPasswordResetEmailAsync(user.Email, resetToken);

        return Ok(new { Message = "Інструкції зі скидання пароля надіслано на ваш email." });
    }

    [HttpPost("reset-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ResetPassword([FromForm] string token, [FromForm] string newPassword, [FromForm] string email)
    {
        if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(newPassword) || string.IsNullOrEmpty(email))
            return BadRequest(new { Error = "Невірний запит." });

        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            return NotFound(new { Error = "Користувач не знайдений." });

        // Перевірка токена
        if (user.ResetTokenExpiry < DateTime.UtcNow || !_authService.VerifyToken(token, user.ResetTokenHash))
            return BadRequest(new { Error = "Недійсний або прострочений токен." });

        var result = await _userManager.ResetPasswordAsync(user, token, newPassword);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        // Очищення токена після успішного скидання
        user.ResetTokenHash = null;
        user.ResetTokenExpiry = null;
        await _userManager.UpdateAsync(user);

        return Ok(new { Message = "Пароль успішно змінено." });
    }

    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword([FromForm] ChangePasswordRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return Unauthorized();

        var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok(new { Message = "Пароль успішно змінено." });
    }

    [HttpGet("ValidateToken")]
    [Authorize] // Захищаємо endpoint, токен перевіряється через middleware
    public IActionResult ValidateToken()
    {
        // Якщо токен валідний, просто повертаємо успішний статус
        return Ok(new { message = "Token is valid" });
    }
}
