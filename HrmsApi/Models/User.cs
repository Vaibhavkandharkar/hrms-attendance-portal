namespace HrmsApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty; // Plain text or hashed for demo
        public string Role { get; set; } = "Employee";
    }
}
