using System.ComponentModel.DataAnnotations;

namespace DentalClinicBackend.DTOs
{
    public class UserLoginDto
    {
        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; } = string.Empty; // Ensures no null reference

        [Required, MinLength(8)]
        public string Password { get; set; } = string.Empty; // Ensures no null reference
    }
}