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
        public DbSet<PatientHistory> PatientHistories { get; set; }
        public DbSet<Service> Services { get; set; }  // Add this line to register the Services model

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Doctor.Configure(modelBuilder);  // You might need to update this if you need to configure relationships.
            
            // Configure relationships for Appointment and Service
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.User)  // Link Appointment to User
                .WithMany()
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Optional: restrict cascading delete if needed

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Doctor)  // Link Appointment to Doctor
                .WithMany()
                .HasForeignKey(a => a.DoctorId)
                .OnDelete(DeleteBehavior.Restrict); // Optional: restrict cascading delete if needed

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Service)  // Link Appointment to Service
                .WithMany()
                .HasForeignKey(a => a.ServiceId)
                .OnDelete(DeleteBehavior.Restrict); // Optional: restrict cascading delete if needed

            base.OnModelCreating(modelBuilder);
        }
    }
}
