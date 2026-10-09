using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using HrmsApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HrmsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ILogger<EmployeesController> _logger;

        public EmployeesController(ILogger<EmployeesController> logger)
        {
            _logger = logger;
        }

        private static List<Employee> _employees = new List<Employee>
        {
            new Employee { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Department = "Engineering", Designation = "Software Engineer", DateOfJoining = DateTime.Now.AddYears(-2) },
            new Employee { Id = 2, FirstName = "Jane", LastName = "Smith", Email = "jane.smith@example.com", Department = "HR", Designation = "HR Manager", DateOfJoining = DateTime.Now.AddYears(-1) }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Employee>> GetEmployees()
        {
            _logger.LogInformation("Fetching all employees.");
            return Ok(_employees);
        }

        [HttpGet("{id}")]
        public ActionResult<Employee> GetEmployee(int id)
        {
            _logger.LogInformation($"Fetching employee with ID: {id}");
            var employee = _employees.FirstOrDefault(e => e.Id == id);

            if (employee == null)
            {
                _logger.LogWarning($"❌ Employee with ID {id} not found.");
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpPost]
        public ActionResult<Employee> PostEmployee(Employee employee)
        {
            _logger.LogInformation($"Adding new employee: {employee.FirstName} {employee.LastName}");
            employee.Id = _employees.Any() ? _employees.Max(e => e.Id) + 1 : 1;
            _employees.Add(employee);

            _logger.LogInformation($"✅ Successfully added employee {employee.FirstName} with ID {employee.Id}");
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public IActionResult PutEmployee(int id, Employee employee)
        {
            _logger.LogInformation($"Attempting to update employee with ID: {id}");

            if (id != employee.Id)
            {
                _logger.LogWarning($"❌ Update failed: URL ID ({id}) does not match Employee ID ({employee.Id}) in the body.");
                return BadRequest();
            }

            var existingEmployee = _employees.FirstOrDefault(e => e.Id == id);
            if (existingEmployee == null)
            {
                _logger.LogWarning($"❌ Update failed: Employee with ID {id} not found.");
                return NotFound();
            }

            existingEmployee.FirstName = employee.FirstName;
            existingEmployee.LastName = employee.LastName;
            existingEmployee.Email = employee.Email;
            existingEmployee.Phone = employee.Phone;
            existingEmployee.Department = employee.Department;
            existingEmployee.Designation = employee.Designation;
            existingEmployee.DateOfJoining = employee.DateOfJoining;
            existingEmployee.IsActive = employee.IsActive;

            _logger.LogInformation($"✅ Successfully updated employee {id}.");
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            _logger.LogInformation($"Attempting to delete employee with ID: {id}");
            
            var employee = _employees.FirstOrDefault(e => e.Id == id);
            if (employee == null)
            {
                _logger.LogWarning($"❌ Delete failed: Employee with ID {id} not found.");
                return NotFound();
            }

            _employees.Remove(employee);
            _logger.LogInformation($"✅ Successfully deleted employee {id}.");

            return NoContent();
        }
    }
}
