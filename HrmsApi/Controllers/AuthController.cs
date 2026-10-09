using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HrmsApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;

        public AuthController(ILogger<AuthController> logger)
        {
            _logger = logger;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            _logger.LogInformation($"Login attempt received for username: {model.Username}");

            if (model.Username == "admin" && model.Password == "admin123")
            {
                _logger.LogInformation("✅ Login successful for admin.");
                return Ok(new { token = "dummy-jwt-token-xyz" });
            }

            _logger.LogWarning($"❌ Failed login attempt for username: {model.Username}. Wrong password.");
            
            return Unauthorized(new { message = "Invalid credentials" });
        }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
