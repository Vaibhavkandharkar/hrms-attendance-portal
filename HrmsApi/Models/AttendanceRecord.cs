namespace HrmsApi.Models
{
    public class AttendanceRecord
    {
        public int Id { get; set; }
        public string EmployeeId { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Status { get; set; } = string.Empty; // Present, Absent, Half-Day
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }
}