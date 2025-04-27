namespace DentalClinicBackend.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public bool HasAllergies { get; set; }
        public string? Allergies { get; set; }
        public bool TakingMedications { get; set; }
        public string? Medications { get; set; }
        public bool HasDentalHistory { get; set; }
        public string? DentalHistory { get; set; }
        public bool HasSurgeries { get; set; }
        public string? Surgeries { get; set; }
        public bool HasAdditionalConcerns { get; set; }
        public string? AdditionalConcerns { get; set; }
    }
}