using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DentalClinicBackend.Models;

namespace DentalClinicBackend.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;

        public DateTime? DateOfBirth { get; set; }

        [MaxLength(10)]
        public string? Gender { get; set; }

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        // Medical Information
        public bool HasAllergies { get; set; } = false;
        public string? Allergies { get; set; }

        public bool TakingMedications { get; set; } = false;
        public string? Medications { get; set; }

        public bool HasDentalHistory { get; set; } = false;
        public string? DentalHistory { get; set; }

        public bool HasSurgeries { get; set; } = false;
        public string? Surgeries { get; set; }

        public bool HasAdditionalConcerns { get; set; } = false;
        public string? AdditionalConcerns { get; set; }

        // Relationship: User can have multiple Appointments
        public List<Appointment> Appointments { get; set; } = new(); // Ensures no null reference

        public string Role { get; set; } = UserRoles.Patient; // Default role
    }
}