using System.ComponentModel.DataAnnotations;

namespace DentalClinicBackend.DTOs
{
    public class UserRegisterDto
    {
        [Required, MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required, MinLength(8)]
        public string Password { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string Phone { get; set; } = string.Empty;

        public DateTime? DateOfBirth { get; set; } // Removed `private set;`

        [MaxLength(10)]
        public string? Gender { get; set; }

        // Boolean fields to determine if user has medical info
        public bool HasAllergies { get; set; } = false;
        public bool TakingMedications { get; set; } = false;
        public bool HasDentalHistory { get; set; } = false;
        public bool HasSurgeries { get; set; } = false;
        public bool HasAdditionalConcerns { get; set; } = false;

        // Nullable fields for medical information
        [MaxLength(255)]
        public string? Allergies { get; set; }
        [MaxLength(255)]
        public string? Medications { get; set; }
        [MaxLength(255)]
        public string? DentalHistory { get; set; }
        [MaxLength(255)]
        public string? Surgeries { get; set; }
        [MaxLength(255)]
        public string? AdditionalConcerns { get; set; }
    }
}