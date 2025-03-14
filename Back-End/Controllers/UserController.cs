using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Milio.Models;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "User")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    /// <summary>
    /// Отримання профілю користувача.
    /// </summary>
    [HttpGet("Profile")]
    [Authorize]
    public async Task<IActionResult> GetProfile()
    {
        try
        {
            // Отримання UserId з claims
            var userId = User.FindFirst("UserId")?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { Message = "Користувач неавторизований." });

            // Отримання профілю користувача
            var user = await _userService.GetUserProfileAsync(userId);

            if (user == null)
                return NotFound(new { Message = "Користувача не знайдено." });

            return Ok(new
            {
                user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                AvatarPath = user.AvatarPath
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetProfile: {ex.Message}");
            return StatusCode(500, new { Message = "Сталася помилка на сервері." });
        }
    }

    /// <summary>
    /// Оновлення профілю користувача.
    /// </summary>
    [HttpPut("Profile")]
    public async Task<IActionResult> UpdateProfile([FromForm] UpdateUserDTO updateUserDto)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { Message = "Користувач неавторизований." });

            var result = await _userService.UpdateUserProfileAsync(userId, updateUserDto);

            if (!result.Success)
                return NotFound(new { Message = result.Message });

            return Ok(new { Message = result.Message });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in UpdateProfile: {ex.Message}");
            return StatusCode(500, new { Message = "Сталася помилка на сервері." });
        }
    }

    /// <summary>
    /// Видалення профілю користувача.
    /// </summary>
    [HttpDelete("delete")]
    [Authorize]
    public async Task<IActionResult> DeleteUser([FromQuery] string userId)
    {
        if (string.IsNullOrEmpty(userId))
        {
            return BadRequest(new { message = "User ID is required." });
        }

        var result = await _userService.DeleteUserAsync(userId);
        if (result.Success)
        {
            return Ok(new { message = result.Message });
        }
        else
        {
            return NotFound(new { message = result.Message });
        }
    }


}
