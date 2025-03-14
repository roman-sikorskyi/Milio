using System;
namespace Milio.Services.Interfaces
{
    // Сервіс для відправки email
    public interface IEmailService
    {
        Task SendPasswordResetEmailAsync(string email, string resetToken);
    }
}

