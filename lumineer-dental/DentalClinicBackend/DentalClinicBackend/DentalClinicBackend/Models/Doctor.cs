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

        public int ServiceId { get; set; } 

        // Define a Value Converter for List<string>
        private static readonly ValueConverter<List<string>, string> _converter =
            new ValueConverter<List<string>, string>(
                v => string.Join(',', v),  // Convert List to a single string
                v => v.Split(',', System.StringSplitOptions.None).ToList() // Convert string back to List
            );

        // Define a Value Comparer for List<string>
        private static readonly ValueComparer<List<string>> _comparer =
            new ValueComparer<List<string>>(
                (c1, c2) => (c1 ?? new List<string>()).SequenceEqual(c2 ?? new List<string>()),
                c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),  // Hashing logic
                c => c.ToList()
            );

        //  Apply Value Converter & Comparer to AvailableTimeSlots
        [Required]
        public List<string> AvailableTimeSlots { get; set; } = new();

        public List<Appointment> Appointments { get; set; } = new();

        // Configure method to apply the value converter and comparer
        public static void Configure(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doctor>()
                .Property(d => d.AvailableTimeSlots)
                .HasConversion(_converter) 
                .Metadata.SetValueComparer(_comparer); 
        }

        // Constructor
        public Doctor()
        {
            AvailableTimeSlots = new List<string>(); 
        }
    }
}
