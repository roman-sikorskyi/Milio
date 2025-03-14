using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    /// <summary>
    /// Отримання всіх користувачів.
    /// </summary>
    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _adminService.GetAllUsersAsync();

        if (users == null || !users.Any())
            return NotFound(new { Message = "Користувачі не знайдені." });

        return Ok(users);
    }

    /// <summary>
    /// Видалення користувача за ідентифікатором.
    /// </summary>
    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            return BadRequest(new { Message = "Невалідний ідентифікатор користувача." });

        var result = await _adminService.DeleteUserAsync(id);

        if (!result.Success)
            return NotFound(new { Message = result.Message });

        return Ok(new { Message = result.Message });
    }

    /// <summary>
    /// Видалення відгуку за ідентифікатором.
    /// </summary>
    [HttpDelete("reviews/{id}")]
    public async Task<IActionResult> DeleteFeedback(int id)
    {
        if (id <= 0)
            return BadRequest(new { Message = "Невалідний ідентифікатор відгуку." });

        var result = await _adminService.DeleteFeedbackAsync(id);

        if (!result.Success)
            return NotFound(new { Message = result.Message });

        return Ok(new { Message = result.Message });
    }
}
