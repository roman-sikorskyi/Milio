using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Milio.Models;

public class Feedback
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(1000)]
    public required string Content { get; set; }

    [Range(1, 5)]
    public int Rating { get; set; }

    [Required]
    public int OfferId { get; set; } // Зв'язок із оголошенням

    [Required]
    public string UserId { get; set; } // Зв'язок із користувачем

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Навігаційні властивості
    [ForeignKey(nameof(OfferId))]
    public required Offer Offer { get; set; }

    [ForeignKey(nameof(UserId))]
    public required User User { get; set; }
}
