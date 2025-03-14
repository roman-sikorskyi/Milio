using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

public class RoleSeeder
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ILogger<RoleSeeder> _logger;

    // Список ролей для створення
    private readonly string[] _roles = { "Admin", "User" };

    public RoleSeeder(RoleManager<IdentityRole> roleManager, ILogger<RoleSeeder> logger)
    {
        _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    /// <summary>
    /// Створює ролі, якщо вони ще не існують у базі даних.
    /// </summary>
    public async Task SeedRolesAsync()
    {
        foreach (var role in _roles)
        {
            try
            {
                // Перевірка, чи існує роль у базі даних
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    var result = await _roleManager.CreateAsync(new IdentityRole(role));
                    if (result.Succeeded)
                    {
                        _logger.LogInformation($"Роль '{role}' успішно створена.");
                    }
                    else
                    {
                        _logger.LogError($"Помилка створення ролі '{role}': {string.Join(", ", result.Errors.Select(e => e.Description))}");
                    }
                }
                else
                {
                    _logger.LogInformation($"Роль '{role}' вже існує.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Виникла помилка під час створення ролі '{role}'.");
            }
        }
    }
}
