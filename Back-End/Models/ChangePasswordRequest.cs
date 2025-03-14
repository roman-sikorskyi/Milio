using System;
using System.ComponentModel.DataAnnotations;

namespace Milio.Models
{
    // Request для зміни пароля
    public class ChangePasswordRequest
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        [MinLength(8)]
        public string NewPassword { get; set; }
    }
}

