public class OfferResponseDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }
}
