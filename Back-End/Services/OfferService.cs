using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

public class OfferService : IOfferService
{
    private readonly ApplicationDbContext _context;

    public OfferService(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Отримує список усіх оголошень.
    /// </summary>
    public async Task<IEnumerable<Offer>> GetAllOffersAsync()
    {
        return await _context.Offers
            .Include(o => o.Feedbacks)
            .AsNoTracking()
            .ToListAsync();
    }

    /// <summary>
    /// Отримує оголошення за його унікальним ідентифікатором.
    /// </summary>
    public async Task<Offer?> GetOfferByIdAsync(int id)
    {
        return await _context.Offers
            .Include(o => o.Feedbacks)
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    /// <summary>
    /// Створює нове оголошення.
    /// </summary>
    public async Task<ResultDTO> CreateOfferAsync(OfferDTO offerDto)
    {
        if (string.IsNullOrWhiteSpace(offerDto.Title) || string.IsNullOrWhiteSpace(offerDto.Description))
        {
            return new ResultDTO
            {
                Success = false,
                Message = "Назва та опис є обов'язковими для створення оголошення."
            };
        }

        if (offerDto.CategoryId <= 0)
        {
            return new ResultDTO
            {
                Success = false,
                Message = "Необхідно вказати коректний CategoryId."
            };
        }

        if (string.IsNullOrWhiteSpace(offerDto.UserId))
        {
            return new ResultDTO
            {
                Success = false,
                Message = "Необхідно вказати UserId для створення оголошення."
            };
        }

        var offer = new Offer
        {
            Title = offerDto.Title,
            Description = offerDto.Description,
            CreatedAt = DateTime.UtcNow,
            CategoryId = offerDto.CategoryId,
            UserId = offerDto.UserId
        };


        _context.Offers.Add(offer);
        var created = await _context.SaveChangesAsync() > 0;

        return new ResultDTO
        {
            Success = created,
            Message = created ? "Оголошення створено успішно." : "Не вдалося створити оголошення."
        };
    }


    /// <summary>
    /// Оновлює існуюче оголошення.
    /// </summary>
    public async Task<ResultDTO> UpdateOfferAsync(int id, OfferDTO offerDto)
    {
        var offer = await _context.Offers.FirstOrDefaultAsync(o => o.Id == id);
        if (offer == null)
        {
            return new ResultDTO
            {
                Success = false,
                Message = "Оголошення не знайдено."
            };
        }

        offer.Title = offerDto.Title;
        offer.Description = offerDto.Description;

        var updated = await _context.SaveChangesAsync() > 0;

        return new ResultDTO
        {
            Success = updated,
            Message = updated ? "Оголошення оновлено успішно." : "Не вдалося оновити оголошення."
        };
    }

    /// <summary>
    /// Видаляє існуюче оголошення.
    /// </summary>
    public async Task<ResultDTO> DeleteOfferAsync(int id)
    {
        var offer = await _context.Offers
            .Include(o => o.Feedbacks)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (offer == null)
        {
            return new ResultDTO
            {
                Success = false,
                Message = "Оголошення не знайдено."
            };
        }

        _context.Offers.Remove(offer);
        var deleted = await _context.SaveChangesAsync() > 0;

        return new ResultDTO
        {
            Success = deleted,
            Message = deleted ? "Оголошення видалено успішно." : "Не вдалося видалити оголошення."
        };
    }

    public async Task<PaginatedResult<OfferResponseDTO>> GetOffersWithFilterAsync(int? categoryId, string? searchTerm, int page, int pageSize)
    {
        var query = _context.Offers
            .Include(o => o.Category)
            .Include(o => o.Feedbacks)
            .AsQueryable();

        return await OfferFilterService.FilterOffersAsync(query, categoryId, searchTerm, page, pageSize);
    }

}
