public class PaginatedResult<T>
{
    public int TotalItems { get; set; } // Загальна кількість елементів
    public int CurrentPage { get; set; } // Поточна сторінка
    public int PageSize { get; set; } // Кількість елементів на сторінці
    public List<T> Items { get; set; } = new List<T>(); // Список елементів
}
