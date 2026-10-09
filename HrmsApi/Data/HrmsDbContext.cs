using Microsoft.EntityFrameworkCore;
using HrmsApi.Models;

namespace HrmsApi.Data
{
    public class HrmsDbContext : DbContext
    {
        public HrmsDbContext(DbContextOptions<HrmsDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<AttendanceRecord> AttendanceRecords { get; set; }
        public DbSet<Employee> Employees { get; set; }
    }
}