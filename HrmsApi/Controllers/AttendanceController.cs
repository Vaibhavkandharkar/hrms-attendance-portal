using Microsoft.AspNetCore.Mvc;
using ClosedXML.Excel;

namespace HrmsApi.Controllers
{
    [Route("api/attendance")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        [HttpGet("template")]
        public IActionResult DownloadTemplate()
        {
            using var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Attendance");
            
            // Header row
            worksheet.Cell(1, 1).Value = "EmployeeId";
            worksheet.Cell(1, 2).Value = "Date";
            worksheet.Cell(1, 3).Value = "Status";

            // Sample row
            worksheet.Cell(2, 1).Value = "EMP001";
            worksheet.Cell(2, 2).Value = "2026-10-07";
            worksheet.Cell(2, 3).Value = "Present";

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            var content = stream.ToArray();

            return File(
                content,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Attendance_Template.xlsx"
            );
        }

        [HttpPost("upload")]
        public IActionResult UploadAttendance(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "No file uploaded." });
            }

            // Processing logic for uploaded attendance Excel file
            return Ok(new { message = "Attendance uploaded and processed successfully!" });
        }
    }
}