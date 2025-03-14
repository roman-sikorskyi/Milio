public interface IFeedbackService
{
    /// <summary>
    /// Отримує список усіх відгуків для певного оголошення.
    /// </summary>
    /// <param name="offerId">Унікальний ідентифікатор оголошення.</param>
    /// <returns>Колекція об'єктів типу Feedback.</returns>
    Task<IEnumerable<Feedback>> GetFeedbackForOfferAsync(int offerId);

    /// <summary>
    /// Створює новий відгук для певного оголошення.
    /// </summary>
    /// <param name="offerId">Унікальний ідентифікатор оголошення.</param>
    /// <param name="feedbackDTO">DTO з даними відгуку.</param>
    /// <param name="userId">ID користувача, який створює відгук.</param>
    /// <returns>True, якщо створення відгуку пройшло успішно, інакше False.</returns>
    Task<bool> CreateFeedbackAsync(int offerId, FeedbackDTO feedbackDTO, string userId);

    /// <summary>
    /// Оновлює існуючий відгук.
    /// </summary>
    /// <param name="feedbackId">Унікальний ідентифікатор відгуку.</param>
    /// <param name="feedbackDTO">DTO з новими даними відгуку.</param>
    /// <param name="userId">ID користувача, який оновлює відгук.</param>
    /// <returns>True, якщо оновлення відгуку пройшло успішно, інакше False.</returns>
    Task<bool> UpdateFeedbackAsync(int feedbackId, FeedbackDTO feedbackDTO, string userId);

    /// <summary>
    /// Видаляє існуючий відгук.
    /// </summary>
    /// <param name="feedbackId">Унікальний ідентифікатор відгуку.</param>
    /// <param name="userId">ID користувача, який видаляє відгук.</param>
    /// <returns>True, якщо видалення відгуку пройшло успішно, інакше False.</returns>
    Task<bool> DeleteFeedbackAsync(int feedbackId, string userId);
}