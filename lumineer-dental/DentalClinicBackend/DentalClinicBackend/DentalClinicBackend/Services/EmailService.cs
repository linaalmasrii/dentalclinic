public class EmailService : IEmailService
{
    public async Task SendAppointmentConfirmationEmailAsync(int userId, DateTime appointmentDate, string timeSlot, string serviceType)
    {
        // Implement your email sending logic here
        // For now, just log the attempt
        Console.WriteLine($"Sending confirmation email for appointment: User {userId}, Date: {appointmentDate}, Time: {timeSlot}, Service: {serviceType}");
        await Task.CompletedTask;
    }
}