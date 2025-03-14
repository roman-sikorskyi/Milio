using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _categoryService.GetAllCategoriesAsync();
        if (categories == null || !categories.Any())
            return NotFound(new { Message = "Категории не найдены." });

        return Ok(categories);
    }


    // GET CAT ID
    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetCategoryById(int id)
    {
        if (id <= 0)
            return BadRequest(new { Message = "Невалідний ID категорії." });

        var category = await _categoryService.GetCategoryByIdAsync(id);

        if (category == null)
            return NotFound(new { Message = "Категорію не знайдено." });

        return Ok(category);
    }

    // CREATE CAT
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateCategory([FromBody] CategoryDTO categoryDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(new { Message = "Невірний формат даних.", Errors = ModelState });

        var result = await _categoryService.CreateCategoryAsync(categoryDto);

        if (!result.Success)
            return BadRequest(new { Message = result.Message });

        return Ok(new { Message = result.Message });
    }

    // UPDATE CAT
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryDTO categoryDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(new { Message = "Невірний формат даних.", Errors = ModelState });

        var result = await _categoryService.UpdateCategoryAsync(id, categoryDto);

        if (!result.Success)
            return NotFound(new { Message = result.Message });

        return Ok(new { Message = result.Message });
    }

    // DELETE CAT
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var result = await _categoryService.DeleteCategoryAsync(id);

        if (!result.Success)
            return NotFound(new { Message = result.Message });

        return Ok(new { Message = result.Message });
    }

    [HttpGet("filter")]
    [AllowAnonymous]
    public async Task<IActionResult> GetCategoriesWithFilter([FromQuery] string? searchTerm, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _categoryService.GetCategoriesWithFilterAsync(searchTerm, page, pageSize);
        if (!result.Items.Any())
            return NotFound(new { Message = "Категорії не знайдені." });
        return Ok(result);
    }
}
