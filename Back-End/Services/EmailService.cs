using System;
using Milio.Services.Interfaces;

namespace Milio.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendPasswordResetEmailAsync(string email, string resetToken)
        {
            var resetUrl = $"{_configuration["Frontend:BaseUrl"]}/reset-password?token={Uri.EscapeDataString(resetToken)}";
            var message = $"<p>Для відновлення пароля натисніть на посилання: <a href='{resetUrl}'>Відновити пароль</a></p>";

            // Логіка для відправки email (наприклад, через SMTP або сторонній сервіс)
            // В даному прикладі буде тільки заглушка
            Console.WriteLine($"Sending email to {email} with reset link: {resetUrl}");
            await Task.CompletedTask;
        }
    }

}

