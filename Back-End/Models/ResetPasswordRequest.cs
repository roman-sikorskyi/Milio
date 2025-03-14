using System;
using System.ComponentModel.DataAnnotations;

namespace Milio.Models
{
    // Request для відновлення пароля
    public class ResetPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}

