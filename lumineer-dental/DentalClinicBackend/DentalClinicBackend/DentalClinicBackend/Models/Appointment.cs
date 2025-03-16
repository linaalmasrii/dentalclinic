
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DentalClinicBackend.Models
{
    public class Appointment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; } = default!; // Ensures non-null assignment

        [Required]
        public int DoctorId { get; set; }

        [ForeignKey("DoctorId")]
        public Doctor Doctor { get; set; } = default!; // Ensures non-null assignment

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required, MaxLength(20)]
        public string TimeSlot { get; set; } = string.Empty; // Ensures no null reference

        [Required, MaxLength(100)]
        public string ServiceType { get; set; } = string.Empty; // Ensures no null reference

        [Required, MaxLength(20)]
        public string Status { get; set; } = "Pending"; // Default to Pending
    }
}