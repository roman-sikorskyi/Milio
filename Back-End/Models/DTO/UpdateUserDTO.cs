using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

public class UpdateUserDTO : IValidatableObject
{
    [MaxLength(50)]
    public string? FirstName { get; set; }

    [MaxLength(50)]
    public string? LastName { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [MinLength(8, ErrorMessage = "Пароль має містити щонайменше 8 символів.")]
    public required string Password { get; set; }

    [Required]
    [Compare("Password", ErrorMessage = "Паролі не збігаються.")]
    public required string ConfirmPassword { get; set; }

    public string? AvatarPath { get; set; }

    public IFormFile? Avatar { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Password == Email)
        {
            yield return new ValidationResult(
                "Пароль не може збігатися з електронною поштою.",
                new[] { nameof(Password) });
        }

        if (Avatar != null)
        {
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var extension = System.IO.Path.GetExtension(Avatar.FileName).ToLower();

            if (!allowedExtensions.Contains(extension))
            {
                yield return new ValidationResult(
                    "Формат файлу не підтримується. Дозволені формати: JPG, JPEG, PNG.",
                    new[] { nameof(Avatar) });
            }

            if (Avatar.Length > 125 * 1024 * 1024) // 125 MB
            {
                yield return new ValidationResult(
                    "Розмір файлу перевищує 125 МБ.",
                    new[] { nameof(Avatar) });
            }
        }
    }
}
