using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IConfiguration _configuration;

    public AuthService(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    /// <summary>
    /// Аутентифікує користувача за email та паролем.
    /// </summary>
    public async Task<string?> AuthenticateUserAsync(LoginDTO loginDTO)
    {
        if (loginDTO == null)
            return null;

        var user = await _userManager.FindByEmailAsync(loginDTO.Email);
        if (user == null)
            return null;

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);
        if (!result.Succeeded)
            return null;

        return await GenerateJwtToken(user);
    }

    /// <summary>
    /// Реєструє нового користувача.
    /// </summary>
    public async Task<bool> RegisterUserAsync(RegisterDTO registerDTO)
    {
        if (registerDTO == null)
            return false;

        var user = new User
        {
            UserName = registerDTO.Email,
            Email = registerDTO.Email,
            FirstName = registerDTO.FirstName,
            LastName = registerDTO.LastName,
        };

        var result = await _userManager.CreateAsync(user, registerDTO.Password);

        // Перевірка на успішну реєстрацію
        if (result.Succeeded)
        {
            // Можна також додати додаткові ролі або верифікацію пошти
            return true;
        }

        // Логування помилок у разі невдачі
        return false;
    }
    // Хешування токена
    public string HashToken(string token)
    {
        using (var sha256 = SHA256.Create())
        {
            var bytes = Encoding.UTF8.GetBytes(token);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }

    // Перевірка відповідності токена хешу
    public bool VerifyToken(string token, string hashedToken)
    {
        var hashOfInput = HashToken(token);
        return hashOfInput == hashedToken;
    }
    /// <summary>
    /// Генерація JWT-токена для користувача.
    /// </summary>
    private async Task<string> GenerateJwtToken(User user)
    {
        // Отримання ролей користувача
        var roles = await _userManager.GetRolesAsync(user);

        // Додавання ролей до claims
        var roleClaims = roles.Select(role => new Claim(ClaimTypes.Role, role)).ToList();

        // Основні claims
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("UserId", user.Id)
        };

        // Об'єднання claims
        claims.AddRange(roleClaims);

        // Створення ключа для токена
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Створення токена
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2), // Використання UTC
            signingCredentials: creds
        );

        // Повернення токена у вигляді строки
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    public async Task<string> GenerateToken(User user)
    {
        return await GenerateJwtToken(user);
    }

}
