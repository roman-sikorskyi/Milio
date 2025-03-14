using Microsoft.EntityFrameworkCore;

public class FeedbackService : IFeedbackService
{
    private readonly ApplicationDbContext _context;

    public FeedbackService(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Отримує список усіх відгуків для певного оголошення.
    /// </summary>
    public async Task<IEnumerable<Feedback>> GetFeedbackForOfferAsync(int offerId)
    {
        return await _context.Feedbacks
            .Where(r => r.OfferId == offerId)
            .Include(r => r.Offer)
            .Include(r => r.User) // Додано Include для User
            .ToListAsync();
    }

    /// <summary>
    /// Створює новий відгук для певного оголошення.
    /// </summary>
    public async Task<bool> CreateFeedbackAsync(int offerId, FeedbackDTO feedbackDTO, string userId)
    {
        // Отримуємо оголошення
        var offer = await _context.Offers.FindAsync(offerId);
        if (offer == null)
            return false;

        // Отримуємо користувача
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
            return false;

        // Ініціалізуємо Feedback із навігаційними властивостями
        var feedback = new Feedback
        {
            Content = feedbackDTO.Content,
            Rating = feedbackDTO.Rating,
            OfferId = offerId,
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            Offer = offer, // Ініціалізуємо Offer
            User = user    // Ініціалізуємо User
        };

        _context.Feedbacks.Add(feedback);
        return await _context.SaveChangesAsync() > 0;
    }

    /// <summary>
    /// Оновлює існуючий відгук.
    /// </summary>
    public async Task<bool> UpdateFeedbackAsync(int feedbackId, FeedbackDTO feedbackDTO, string userId)
    {
        var feedback = await _context.Feedbacks
            .Include(r => r.Offer) // Завантажуємо пов'язаний Offer
            .Include(r => r.User)  // Завантажуємо пов'язаного User
            .FirstOrDefaultAsync(r => r.Id == feedbackId);

        if (feedback == null)
            return false;

        // Перевірка, чи належить відгук користувачеві
        if (feedback.UserId != userId)
            return false;

        // Оновлюємо відгук
        feedback.Content = feedbackDTO.Content;
        feedback.Rating = feedbackDTO.Rating;

        return await _context.SaveChangesAsync() > 0;
    }

    /// <summary>
    /// Видаляє існуючий відгук.
    /// </summary>
    public async Task<bool> DeleteFeedbackAsync(int feedbackId, string userId)
    {
        var feedback = await _context.Feedbacks
            .Include(r => r.Offer) // Завантажуємо пов'язаний Offer
            .Include(r => r.User)  // Завантажуємо пов'язаного User
            .FirstOrDefaultAsync(r => r.Id == feedbackId);

        if (feedback == null)
            return false;

        // Перевірка, чи належить відгук користувачеві
        if (feedback.UserId != userId)
            return false;

        _context.Feedbacks.Remove(feedback);
        return await _context.SaveChangesAsync() > 0;
    }
}
