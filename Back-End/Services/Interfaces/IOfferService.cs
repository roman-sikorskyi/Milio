// Services/Interfaces/IUserService.cs
using System.Collections.Generic;
using Milio.Models;

public interface IOfferService
{

    /// <summary>
    /// Отримує список усіх оголошень.
    /// </summary>
    /// <returns>Колекція об'єктів типу Offer.</returns>
    Task<IEnumerable<Offer>> GetAllOffersAsync();
    /// <summary>
    /// Отримує оголошення за його унікальним ідентифікатором.
    /// </summary>
    /// <param name="id">Унікальний ідентифікатор оголошення.</param>
    /// <returns>Об'єкт Offer або null, якщо оголошення не знайдено.</returns>
    Task<Offer?> GetOfferByIdAsync(int id);

    /// <summary>
    /// Створює нове оголошення.
    /// </summary>
    /// <param name="offerDTO">Об'єкт DTO з даними оголошення.</param>
    /// <returns>True, якщо створення оголошення пройшло успішно, інакше False.</returns>
    Task<ResultDTO> CreateOfferAsync(OfferDTO offerDto); // Переконайтеся, що тип співпадає
    /// <summary>
    /// Оновлює існуюче оголошення.
    /// </summary>
    /// <param name="id">Унікальний ідентифікатор оголошення.</param>
    /// <param name="offerDTO">Об'єкт DTO з новими даними оголошення.</param>
    /// <returns>True, якщо оновлення оголошення пройшло успішно, інакше False.</returns>
    Task<ResultDTO> UpdateOfferAsync(int id, OfferDTO offerDto);

    /// <summary>
    /// Видаляє існуюче оголошення.
    /// </summary>
    /// <param name="id">Унікальний ідентифікатор оголошення.</param>
    /// <returns>True, якщо видалення оголошення пройшло успішно, інакше False.</returns>
    Task<ResultDTO> DeleteOfferAsync(int id);

    /// <summary>
    /// Фільтрація оголошень за категорією та пошук за назвою/описом
    /// </summary>
    /// <param name="categoryId">Id категорії</param>
    /// <param name="searchTerm">Текст для пошуку</param>
    /// <param name="page">Номер сторінки</param>
    /// <param name="pageSize">Кількість оголошень на сторінці</param>
    /// <returns>Список відфільтрованих оголошень.</returns>
    Task<PaginatedResult<OfferResponseDTO>> GetOffersWithFilterAsync(int? categoryId, string? searchTerm, int page, int pageSize);


}
