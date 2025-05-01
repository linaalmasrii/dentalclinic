using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace DentalClinicBackend.Models
{
    public class Doctor
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Specialty { get; set; } = string.Empty; // like "Botox"

        [MaxLength(100)]
        public string Title { get; set; } = string.Empty; // like "Botox Specialist"

        [MaxLength(255)]
        public string ImageUrl { get; set; } = string.Empty;

        // Removed ServiceId and added a collection of services
        //public List<DoctorService> DoctorServices { get; set; } = new List<DoctorService>();

        
        //  Apply Value Converter & Comparer to AvailableTimeSlots
        [Required]
        public List<string> AvailableTimeSlots { get; set; } = new();

        public List<Appointment> Appointments { get; set; } = new();

        public static void Configure(ModelBuilder modelBuilder)
{
    // No conversion needed for AvailableTimeSlots; EF Core maps List<string> to text[] natively in PostgreSQL.
}

        // Constructor
        public Doctor()
        {
            AvailableTimeSlots = new List<string>(); 
        }
    }
}
