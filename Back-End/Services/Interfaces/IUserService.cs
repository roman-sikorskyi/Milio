// Services/Interfaces/IUserService.cs
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IUserService
{
    // Профіль користувача
    Task<User?> GetUserProfileAsync(string userId);

    /// <summary>
    /// Оновлення профілю користувача, включаючи можливість змінити аватар.
    /// </summary>
    Task<ResultDTO> UpdateUserProfileAsync(string userId, UpdateUserDTO updateUserDto, string avatarUrl = null);
    /// <summary>
    /// Видалення профілю користувача
    /// </summary>
    Task<ResultDTO> DeleteUserAsync(string userId);
    // Відгуки користувача
    Task<IEnumerable<Feedback>> GetFeedbackForUserAsync(string userId);
    Task<ResultDTO> CreateFeedbackAsync(int offerId, FeedbackDTO feedbackDTO, string userId);
    Task<ResultDTO> DeleteFeedbackByUserAsync(int feedbackId, string userId);
}


