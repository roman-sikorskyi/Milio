using System.ComponentModel.DataAnnotations;

public class OfferDTO
{
    [Required]
    [MaxLength(100)]
    public required string Title { get; set; }

    [Required]
    [MaxLength(500)]
    public required string Description { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Required] 
    public int CategoryId { get; set; }

    [Required] 
    public string UserId { get; set; } = null!;
}
