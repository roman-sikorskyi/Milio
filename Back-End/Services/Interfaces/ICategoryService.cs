public interface ICategoryService
{
    Task<IEnumerable<CategoryResponseDTO>> GetAllCategoriesAsync();
    Task<CategoryResponseDTO?> GetCategoryByIdAsync(int id);
    Task<ResultDTO> CreateCategoryAsync(CategoryDTO categoryDto);
    Task<ResultDTO> UpdateCategoryAsync(int id, CategoryDTO categoryDto);
    Task<ResultDTO> DeleteCategoryAsync(int id);
    Task<PaginatedResult<CategoryResponseDTO>> GetCategoriesWithFilterAsync(string? searchTerm, int page, int pageSize);
}
