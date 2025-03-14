public interface IAuthService
{
    /// <summary>
    /// Аутентифікує користувача за електронною поштою та паролем.
    /// </summary>
    /// <param name="loginDTO">Об'єкт DTO з даними для аутентифікації користувача.</param>
    /// <returns>JWT-токен у випадку успішної аутентифікації, або null.</returns>
    Task<string?> AuthenticateUserAsync(LoginDTO loginDTO);

    /// <summary>
    /// Генерує токен для користувача.
    /// </summary>
    /// <param name="user">Об'єкт користувача.</param>
    /// <returns>JWT-токен.</returns>
    Task<string> GenerateToken(User user);

    /// <summary>
    /// Реєструє нового користувача.
    /// </summary>
    /// <param name="registerDTO">Об'єкт DTO з даними для реєстрації користувача.</param>
    /// <returns>True, якщо реєстрація пройшла успішно, інакше False.</returns>
    Task<bool> RegisterUserAsync(RegisterDTO registerDTO);

    /// <summary>
    /// Хешує токен.
    /// </summary>
    /// <param name="token">Токен, який потрібно хешувати.</param>
    /// <returns>Хешований токен.</returns>
    string HashToken(string token);

    /// <summary>
    /// Перевіряє токен на відповідність хешу.
    /// </summary>
    /// <param name="token">Оригінальний токен.</param>
    /// <param name="hashedToken">Хешований токен.</param>
    /// <returns>True, якщо токен відповідає хешу, інакше False.</returns>
    bool VerifyToken(string token, string hashedToken);
}
