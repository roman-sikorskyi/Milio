using System.ComponentModel.DataAnnotations;

namespace Milio.Models
{
    public class ForgotPasswordRequest
    {
        [Required(ErrorMessage = "Email є обов'язковим.")]
        [EmailAddress(ErrorMessage = "Невірний формат email.")]
        public string Email { get; set; }
    }
}

