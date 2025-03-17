using DentalClinicBackend.Models;
using BCrypt.Net;

namespace DentalClinicBackend.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(ApplicationDbContext context)
        {
            // Check if admin exists
            if (!context.Users.Any(u => u.Role == UserRoles.Admin))
            {
                var adminUser = new User
                {
                    Email = "admin@dentalclinic.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
                    FirstName = "System",
                    LastName = "Admin",
                    Role = UserRoles.Admin,
                    PhoneNumber = "1234567890"
                };
                context.Users.Add(adminUser);
                await context.SaveChangesAsync();
            }
        }
    }
}
