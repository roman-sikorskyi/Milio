// Models/DTO/LoginDto.cs
using System.ComponentModel.DataAnnotations;

public class LoginDTO
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [MinLength(8, ErrorMessage = "Неправильний пароль.")]
    public required string Password { get; set; }
}
