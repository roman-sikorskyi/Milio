public interface IAdminService
{
    // Керування користувачами
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<ResultDTO> DeleteUserAsync(string id);

    // Керування оголошеннями
    Task<ResultDTO> CreateOfferAsync(OfferDTO offerDTO);
    Task<ResultDTO> UpdateOfferAsync(int offerId, OfferDTO offerDTO);
    Task<ResultDTO> DeleteOfferAsync(int offerId);

    // Керування відгуками
    Task<ResultDTO> DeleteFeedbackAsync(int feedbackId);
}

