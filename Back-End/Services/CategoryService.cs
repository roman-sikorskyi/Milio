using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Linq;


public class CategoryService : ICategoryService
{
    private readonly ApplicationDbContext _context;

    public CategoryService(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET CAT
    public async Task<IEnumerable<CategoryResponseDTO>> GetAllCategoriesAsync()
    {
        return await _context.Categories
            .Select(c => new CategoryResponseDTO
            {
                Id = c.Id,
                Name = c.Name
            })
            .ToListAsync();
    }

    // GET CAT ID
    public async Task<CategoryResponseDTO?> GetCategoryByIdAsync(int id)
    {
        return await _context.Categories
            .Where(c => c.Id == id)
            .Select(c => new CategoryResponseDTO
            {
                Id = c.Id,
                Name = c.Name
            })
            .FirstOrDefaultAsync();
    }

    // CREATE CAT
    public async Task<ResultDTO> CreateCategoryAsync(CategoryDTO categoryDto)
    {
        var category = new Category
        {
            Name = categoryDto.Name
        };

        _context.Categories.Add(category);
        var created = await _context.SaveChangesAsync() > 0;

        return new ResultDTO
        {
            Success = created,
            Message = created ? "Категорія успішно створена." : "Не вдалося створити категорію."
        };
    }

    // UPDATE CAT
    public async Task<ResultDTO> UpdateCategoryAsync(int id, CategoryDTO categoryDto)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        if (category == null)
        {
            return new ResultDTO
            {
                Success = false,
                Message = "Категорія не знайдена."
            };
        }

        category.Name = categoryDto.Name;

        var updated = await _context.SaveChangesAsync() > 0;

        return new ResultDTO
        {
            Success = updated,
            Message = updated ? "Категорію успішно оновлено." : "Не вдалося оновити категорію."
        };
    }

    // DELETE CAT
    public async Task<ResultDTO> DeleteCategoryAsync(int id)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        if (category == null)
        {
            return new ResultDTO
            {
                Success = false,
                Message = "Категорія не знайдена."
            };
        }

        _context.Categories.Remove(category);
        var deleted = await _context.SaveChangesAsync() > 0;

        return new ResultDTO
        {
            Success = deleted,
            Message = deleted ? "Категорію успішно видалено." : "Не вдалося видалити категорію."
        };
    }

    public async Task<PaginatedResult<CategoryResponseDTO>> GetCategoriesWithFilterAsync(string? searchTerm, int page, int pageSize)
    {
        var query = _context.Categories
            .Include(c => c.Offers)
            .AsQueryable();

        return await CategoryFilterService.FilterCategoriesAsync(query, searchTerm, page, pageSize);
    }
}
