using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

public class User : IdentityUser
{
    [Required]
    [MaxLength(50)]
    [RegularExpression(@"^[А-Яа-яЇїЄєІіҐґA-Za-z'-]+$", ErrorMessage = "Поле може містити тільки літери українського або латинського алфавіту.")]
    public string? FirstName { get; set; }

    [Required]
    [MaxLength(50)]
    [RegularExpression(@"^[А-Яа-яЇїЄєІіҐґA-Za-z'-]+$", ErrorMessage = "Поле може містити тільки літери українського або латинського алфавіту.")]
    public string? LastName { get; set; }

    [Required]
    [EmailAddress]
    public override string? Email { get; set; }

    public string? AvatarPath { get; set; }

    public string? ResetToken { get; set; }
    public string? ResetTokenHash { get; set; } // Хешований токен для скидання пароля
    public DateTime? ResetTokenExpiry { get; set; } // Термін дії токена
    // Навігаційні властивості
    public ICollection<Offer> Offers { get; set; } = new List<Offer>();
    public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
}
