using System.ComponentModel.DataAnnotations;

namespace Milio.Models
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Email є обов'язковим.")]
        [EmailAddress(ErrorMessage = "Невірний формат email.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Пароль є обов'язковим.")]
        public required string Password { get; set; }
    }
}
