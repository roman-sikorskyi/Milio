using Milio.Models;
using System.ComponentModel.DataAnnotations;

public class Offer
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = null!;

    [Required]
    [MaxLength(1000)]
    public string Description { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Доданий зв’язок із сутністю Category
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    // Навігаційні властивості
    public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
    public string UserId { get; set; } = null!;
    public User User { get; set; } = null!;
}
