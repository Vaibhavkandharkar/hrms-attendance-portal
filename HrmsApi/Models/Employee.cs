using System;
using System.ComponentModel.DataAnnotations;

namespace HrmsApi.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string Phone { get; set; }

        public string Department { get; set; }

        public string Designation { get; set; }

        public DateTime DateOfJoining { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
