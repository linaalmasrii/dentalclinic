using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using DentalClinicBackend.Data;
using DentalClinicBackend.Models;
using DentalClinicBackend.DTOs;


namespace DentalClinicBackend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        //  REGISTER Endpoint
    [HttpPost("register")]
public async Task<IActionResult> Register([FromBody] UserRegisterDto request)
{
    try
    {
        Console.WriteLine($"Received registration request for email: {request.Email}"); // Debug log

        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            return BadRequest(new { message = "Email and password are required." });

        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            return BadRequest(new { message = "Email already exists!" });

        var user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            PhoneNumber = request.Phone,
            Gender = request.Gender,
            DateOfBirth = request.DateOfBirth,
            PasswordHash = HashPassword(request.Password),
            // Medical Information
            HasAllergies = request.HasAllergies,
            Allergies = request.Allergies,
            TakingMedications = request.TakingMedications,
            Medications = request.Medications,
            HasDentalHistory = request.HasDentalHistory,
            DentalHistory = request.DentalHistory,
            HasSurgeries = request.HasSurgeries,
            Surgeries = request.Surgeries,
            HasAdditionalConcerns = request.HasAdditionalConcerns,
            AdditionalConcerns = request.AdditionalConcerns
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User registered successfully!" });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Registration error: {ex.Message}"); // Debug log
        return BadRequest(new { message = "Registration failed", error = ex.Message });
    }
}

        // LOGIN Endpoint (Returns JWT Token)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return BadRequest(new { message = "Email and password are required." });

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid credentials!" });

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                message = "Login successful!",
                token,
                user = new
                {
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.Email
                }
            });
        }

        // GENERATE JWT Token
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("firstName", user.FirstName),
                new Claim("lastName", user.LastName)
            };

            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is not configured"));
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(12),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // PASSWORD HASHING
        private string HashPassword(string password)
        {
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }

        // PASSWORD VERIFICATION
        private bool VerifyPassword(string enteredPassword, string storedHash)
        {
            return HashPassword(enteredPassword) == storedHash;
        }

        // GET api/auth/profile
        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> Profile()
        {
            // 1) Extract userId from JWT
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(idClaim, out var userId))
                return Unauthorized();

            // 2) Fetch and project into your DTO (including med‑info)
            var profile = await _context.Users
                .Where(u => u.Id == userId)
                .Select(u => new UserDto
                {
                    Id                     = u.Id,
                    FirstName              = u.FirstName,
                    LastName               = u.LastName,
                    Email                  = u.Email,
                    PhoneNumber            = u.PhoneNumber,
                    DateOfBirth            = u.DateOfBirth,
                    Gender                 = u.Gender,
                    HasAllergies           = u.HasAllergies,
                    Allergies              = u.Allergies,
                    TakingMedications      = u.TakingMedications,
                    Medications            = u.Medications,
                    HasDentalHistory       = u.HasDentalHistory,
                    DentalHistory          = u.DentalHistory,
                    HasSurgeries           = u.HasSurgeries,
                    Surgeries              = u.Surgeries,
                    HasAdditionalConcerns  = u.HasAdditionalConcerns,
                    AdditionalConcerns     = u.AdditionalConcerns
                })
                .FirstOrDefaultAsync();

            if (profile == null) return NotFound();
            return Ok(profile);
        }
    }
}
