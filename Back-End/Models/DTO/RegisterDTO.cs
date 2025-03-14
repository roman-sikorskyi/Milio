// Models/DTO/RegisterUserDto.cs
using System;
using System.ComponentModel.DataAnnotations;

public class RegisterDTO
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
    public required string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [MinLength(8, ErrorMessage = "Пароль має містити щонайменше 8 символів.")]
    public required string Password { get; set; }

    [Required]
    [Compare("Password", ErrorMessage = "Паролі не збігаються.")]
    [DataType(DataType.Password)]
    public required string ConfirmPassword { get; set; }
}
