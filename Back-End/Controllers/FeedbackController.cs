using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
public class FeedbackController : ControllerBase
{
    private readonly IFeedbackService _feedbackService;

    public FeedbackController(IFeedbackService feedbackService)
    {
        _feedbackService = feedbackService;
    }

    [HttpPost("{offerId}")]
    [Authorize(Roles = "User")]
    public async Task<IActionResult> CreateFeedback(int offerId, [FromBody] FeedbackDTO feedbackDto)
    {
        if (offerId <= 0)
            return BadRequest(new { Message = "Невалідний ID оголошення." });

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        string? userId = User.Identity.Name;
        var success = await _feedbackService.CreateFeedbackAsync(offerId, feedbackDto, userId);

        if (!success)
            return NotFound(new { Message = "Оголошення не знайдено." });

        return Ok(new { Message = "Відгук успішно створено." });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "User")]
    public async Task<IActionResult> UpdateFeedback(int id, [FromBody] FeedbackDTO feedbackDto)
    {
        if (id <= 0)
            return BadRequest(new { Message = "Невалідний ID відгуку." });

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = User.Identity.Name;
        var success = await _feedbackService.UpdateFeedbackAsync(id, feedbackDto, userId);

        if (!success)
            return NotFound(new { Message = "Відгук не знайдено." });

        return Ok(new { Message = "Відгук успішно оновлено." });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "User,Admin")]
    public async Task<IActionResult> DeleteReview(int id)
    {
        if (id <= 0)
            return BadRequest(new { Message = "Невалідний ID відгуку." });

        var userId = User.Identity.Name;
        var isAdmin = User.IsInRole("Admin");

        var success = await _feedbackService.DeleteFeedbackAsync(id, isAdmin ? null : userId);

        if (!success)
            return NotFound(new { Message = "Відгук не знайдено." });

        return Ok(new { Message = "Відгук успішно видалено." });
    }
}
