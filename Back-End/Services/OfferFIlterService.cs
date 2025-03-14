using Microsoft.EntityFrameworkCore;

public class OfferFilterService
{
    /// <summary>
    /// Фільтрує оголошення за категорією, пошуковим запитом та застосовує пагінацію
    /// </summary>
    /// <param name="query">Запит до бази даних</param>
    /// <param name="categoryId">ID категорії</param>
    /// <param name="searchTerm">Пошуковий запит</param>
    /// <param name="page">Номер сторінки</param>
    /// <param name="pageSize">Кількість елементів на сторінці</param>
    /// <returns>Відфільтрований та відсортований список оголошень</returns>
    public static async Task<PaginatedResult<OfferResponseDTO>> FilterOffersAsync(
        IQueryable<Offer> query,
        int? categoryId,
        string? searchTerm,
        int page,
        int pageSize
    )
    {
        if (categoryId.HasValue)
        {
            query = query.Where(offer => offer.CategoryId == categoryId.Value);
        }

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(offer =>
                EF.Functions.ILike(offer.Title, $"%{searchTerm}%") ||
                EF.Functions.ILike(offer.Description, $"%{searchTerm}%")
            );
        }

        var totalItems = await query.CountAsync();

        var offers = await query
            .OrderByDescending(offer => offer.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(o => new OfferResponseDTO
            {
                Id = o.Id,
                Title = o.Title,
                Description = o.Description,
                CreatedAt = o.CreatedAt,
                CategoryId = o.CategoryId,
                CategoryName = o.Category.Name
            })
            .ToListAsync();

        return new PaginatedResult<OfferResponseDTO>
        {
            TotalItems = totalItems,
            CurrentPage = page,
            PageSize = pageSize,
            Items = offers
        };
    }
}
