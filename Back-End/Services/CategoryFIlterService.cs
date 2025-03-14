using Microsoft.EntityFrameworkCore;

public class CategoryFilterService
{
    /// <summary>
    /// Фільтрує категорії за назвою та застосовує пагінацію
    /// </summary>
    /// <param name="query">Запит до бази даних</param>
    /// <param name="searchTerm">Пошуковий запит</param>
    /// <param name="page">Номер сторінки</param>
    /// <param name="pageSize">Кількість елементів на сторінці</param>
    /// <returns>Відфільтрований та відсортований список категорій</returns>
    public static async Task<PaginatedResult<CategoryResponseDTO>> FilterCategoriesAsync(
        IQueryable<Category> query,
        string? searchTerm,
        int page,
        int pageSize
    )
    {
        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(category =>
                EF.Functions.ILike(category.Name, $"%{searchTerm}%")
            );
        }

        var totalItems = await query.CountAsync();

        var categories = await query
            .OrderBy(category => category.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new CategoryResponseDTO
            {
                Id = c.Id,
                Name = c.Name
            })
            .ToListAsync();

        return new PaginatedResult<CategoryResponseDTO>
        {
            TotalItems = totalItems,
            CurrentPage = page,
            PageSize = pageSize,
            Items = categories
        };
    }
}
