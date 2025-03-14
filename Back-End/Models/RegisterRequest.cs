using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace Milio.Models
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Email є обов'язковим.")]
        [EmailAddress(ErrorMessage = "Невірний формат email.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Пароль є обов'язковим.")]
        [MinLength(8, ErrorMessage = "Пароль має бути не менше 8 символів.")]
        public required string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IFormFile Avatar { get; set; }
    }
} 
