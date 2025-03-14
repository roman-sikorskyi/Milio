using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

public class UserAdminService : IUserService, IAdminService
{
    private readonly UserManager<User> _userManager;
    private readonly ApplicationDbContext _context;

    public UserAdminService(UserManager<User> userManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    // Видалення користувача 
    public async Task<ResultDTO> DeleteUserAsync(string userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return new ResultDTO
            {
                Success = false,
                Message = "User not found."
            };
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return new ResultDTO
        {
            Success = true,
            Message = "User successfully deleted."
        };
    }

    // Реалізація IUserService

    public async Task<User?> GetUserProfileAsync(string userId)
    {
        return await _userManager.FindByIdAsync(userId);
    }

    public async Task<ResultDTO> UpdateUserProfileAsync(string userId, UpdateUserDTO updateUserDto, string avatarUrl = null)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return new ResultDTO { Success = false, Message = "Користувач не знайдений." };

        // Оновлення змінених даних
        if (!string.IsNullOrWhiteSpace(updateUserDto.FirstName))
            user.FirstName = updateUserDto.FirstName;

        if (!string.IsNullOrWhiteSpace(updateUserDto.LastName))
            user.LastName = updateUserDto.LastName;

        // Оновлення аватара
        if (updateUserDto.Avatar != null) // Avatar - це тип IFormFile
        {
            // Збереження файлу на сервер
            var avatarFileName = $"{Guid.NewGuid()}_{updateUserDto.Avatar.FileName}";
            var avatarPath = Path.Combine("wwwroot/uploads/avatars", avatarFileName);

            // Використання FileStream для збереження файлу
            using (var stream = new FileStream(avatarPath, FileMode.Create))
            {
                await updateUserDto.Avatar.CopyToAsync(stream);
            }

            // Оновлення шляху до аватара в моделі користувача
            user.AvatarPath = $"/uploads/avatars/{avatarFileName}";
        }

        var result = await _userManager.UpdateAsync(user);

        return new ResultDTO
        {
            Success = result.Succeeded,
            Message = result.Succeeded ? "Профіль оновлено." : "Не вдалося оновити профіль."
        };
    }

    public async Task<IEnumerable<Feedback>> GetFeedbackForUserAsync(string userId)
    {
        return await _context.Feedbacks
            .Where(r => r.UserId == userId)
            .Include(r => r.Offer)
            .ToListAsync();
    }

    public async Task<ResultDTO> CreateFeedbackAsync(int offerId, FeedbackDTO feedbackDTO, string userId)
    {
        // Перевіряємо існування пропозиції
        var offer = await _context.Offers.FindAsync(offerId);
        if (offer == null)
            return new ResultDTO { Success = false, Message = "Пропозиція не знайдена." };

        // Завантажуємо користувача
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return new ResultDTO { Success = false, Message = "Користувача не знайдено." };

        // Перевірка валідності оцінки
        if (feedbackDTO.Rating < 1 || feedbackDTO.Rating > 5)
            return new ResultDTO { Success = false, Message = "Оцінка повинна бути в діапазоні 1-5." };

        // Створення нового відгуку
        var feedback = new Feedback
        {
            Content = feedbackDTO.Content,
            Rating = feedbackDTO.Rating,
            OfferId = offerId,
            UserId = userId,
            User = user, // Додаємо обов’язковий член
            CreatedAt = DateTime.UtcNow,
            Offer = offer // Ініціалізуємо навігаційну властивість
        };

        await _context.Feedbacks.AddAsync(feedback);
        var saved = await _context.SaveChangesAsync() > 0;

        return new ResultDTO
        {
            Success = saved,
            Message = saved ? "Відгук створено." : "Не вдалося створити відгук."
        };
    }


    public async Task<ResultDTO> DeleteFeedbackByUserAsync(int feedbackId, string userId)
    {
        var feedback = await _context.Feedbacks.FirstOrDefaultAsync(r => r.Id == feedbackId && r.UserId == userId);
        if (feedback == null)
            return new ResultDTO { Success = false, Message = "Відгук не знайдено або доступ заборонений." };

        _context.Feedbacks.Remove(feedback);
        var deleted = await _context.SaveChangesAsync() > 0;

        return new ResultDTO
        {
            Success = deleted,
            Message = deleted ? "Відгук видалено." : "Не вдалося видалити відгук."
        };
    }

    // Реалізація IAdminService

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _userManager.Users.ToListAsync();
    }  

    public async Task<ResultDTO> CreateOfferAsync(OfferDTO offerDTO)
    {
        if (string.IsNullOrWhiteSpace(offerDTO.Title) || string.IsNullOrWhiteSpace(offerDTO.Description))
            return new ResultDTO { Success = false, Message = "Назва та опис обов'язкові." };

        var offer = new Offer
        {
            Title = offerDTO.Title,
            Description = offerDTO.Description,
            CreatedAt = DateTime.UtcNow
        };

        await _context.Offers.AddAsync(offer);
        var created = await _context.SaveChangesAsync() > 0;

        return new ResultDTO
        {
            Success = created,
            Message = created ? "Пропозиція створена." : "Не вдалося створити пропозицію."
        };
    }

    public async Task<ResultDTO> UpdateOfferAsync(int offerId, OfferDTO offerDTO)
    {
        var offer = await _context.Offers.FirstOrDefaultAsync(o => o.Id == offerId);
        if (offer == null)
            return new ResultDTO { Success = false, Message = "Пропозиція не знайдена." };

        offer.Title = offerDTO.Title;
        offer.Description = offerDTO.Description;

        var updated = await _context.SaveChangesAsync() > 0;

        return new ResultDTO
        {
            Success = updated,
            Message = updated ? "Пропозицію оновлено." : "Не вдалося оновити пропозицію."
        };
    }

    public async Task<ResultDTO> DeleteOfferAsync(int offerId)
    {
        var offer = await _context.Offers.FirstOrDefaultAsync(o => o.Id == offerId);
        if (offer == null)
            return new ResultDTO { Success = false, Message = "Пропозиція не знайдена." };

        _context.Offers.Remove(offer);
        var deleted = await _context.SaveChangesAsync() > 0;

        return new ResultDTO
        {
            Success = deleted,
            Message = deleted ? "Пропозицію видалено." : "Не вдалося видалити пропозицію."
        };
    }

    public async Task<ResultDTO> DeleteFeedbackAsync(int feedbackId)
    {
        var feedback = await _context.Feedbacks.FirstOrDefaultAsync(f => f.Id == feedbackId);
        if (feedback == null)
            return new ResultDTO { Success = false, Message = "Відгук не знайдено." };

        _context.Feedbacks.Remove(feedback);
        var deleted = await _context.SaveChangesAsync() > 0;

        return new ResultDTO
        {
            Success = deleted,
            Message = deleted ? "Відгук видалено." : "Не вдалося видалити відгук."
        };
    }
}
