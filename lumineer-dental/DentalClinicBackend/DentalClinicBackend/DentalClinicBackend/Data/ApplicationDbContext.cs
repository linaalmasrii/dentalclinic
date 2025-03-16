using Microsoft.EntityFrameworkCore;
using DentalClinicBackend.Models;

namespace DentalClinicBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Doctor.Configure(modelBuilder);  // ✅ Apply the Value Converter and Comparer
            base.OnModelCreating(modelBuilder);
        }
    }
}