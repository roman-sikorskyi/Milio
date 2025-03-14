using System.ComponentModel.DataAnnotations;

public class FeedbackDTO
{
    [Required]
    [MaxLength(500)]
    public required string Content { get; set; }

    [Range(1, 5)]
    public int Rating { get; set; }
}
