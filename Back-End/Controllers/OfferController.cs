using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OfferController : ControllerBase
{
    private readonly IOfferService _offerService;

    public OfferController(IOfferService offerService)
    {
        _offerService = offerService;
    }

    /// <summary>
    /// Отримання всіх оголошень. 
    /// </summary>
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAllOffers()
    {
        var offers = await _offerService.GetAllOffersAsync();

        // Перевірка, чи є доступні оголошення
        if (offers == null || !offers.Any())
            return NotFound(new { Message = "Оголошення не знайдено." });

        return Ok(offers);
    }

    /// <summary>
    /// Отримання оголошення за ID.
    /// </summary>
    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetOfferById(int id)
    {
        // Перевірка на валідність ID
        if (id <= 0)
            return BadRequest(new { Message = "Невалідний ID оголошення." });

        var offer = await _offerService.GetOfferByIdAsync(id);

        // Перевірка, чи оголошення існує
        if (offer == null)
            return NotFound(new { Message = "Оголошення не знайдено." });

        return Ok(offer);
    }

    /// <summary>
    /// Створення нового оголошення.
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateOffer([FromBody] OfferDTO offerDto)
    {
        // Перевірка валідності моделі
        if (!ModelState.IsValid)
            return BadRequest(new { Message = "Невірний формат даних.", Errors = ModelState });

        var result = await _offerService.CreateOfferAsync(offerDto);

        // Перевірка результату створення
        if (!result.Success)
            return BadRequest(new { Message = result.Message });

        return Ok(new { Message = result.Message });
    }

    /// <summary>
    /// Оновлення оголошення за ID.
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateOffer(int id, [FromBody] OfferDTO offerDto)
    {
        // Перевірка на валідність ID
        if (id <= 0)
            return BadRequest(new { Message = "Невалідний ID оголошення." });

        // Перевірка валідності моделі
        if (!ModelState.IsValid)
            return BadRequest(new { Message = "Невірний формат даних.", Errors = ModelState });

        var result = await _offerService.UpdateOfferAsync(id, offerDto);

        // Перевірка результату оновлення
        if (!result.Success)
            return NotFound(new { Message = result.Message });

        return Ok(new { Message = result.Message });
    }

    /// <summary>
    /// Видалення оголошення за ID.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteOffer(int id)
    {
        // Перевірка на валідність ID
        if (id <= 0)
            return BadRequest(new { Message = "Невалідний ID оголошення." });

        var result = await _offerService.DeleteOfferAsync(id);

        // Перевірка результату видалення
        if (!result.Success)
            return NotFound(new { Message = result.Message });

        return Ok(new { Message = result.Message });
    }

    /// <summary>
    /// Фільтрація оголошень за категорією та пошук за назвою/описом
    /// </summary>
    /// <param name="categoryId">Id категорії</param>
    /// <param name="searchTerm">Текст для пошуку</param>
    /// <param name="page">Номер сторінки</param>
    /// <param name="pageSize">Кількість оголошень на сторінці</param>
    /// <returns>Список відфільтрованих оголошень</returns>
    [HttpGet("filter")]
    [AllowAnonymous]
    public async Task<IActionResult> GetOffersWithFilter([FromQuery] int? categoryId, [FromQuery] string? searchTerm, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _offerService.GetOffersWithFilterAsync(categoryId, searchTerm, page, pageSize);
        if (!result.Items.Any())
            return NotFound(new { Message = "Оголошення не знайдені." });
        return Ok(result);
    }


}
