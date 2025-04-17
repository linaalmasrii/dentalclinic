public interface IEmailService
{
    Task SendAppointmentConfirmationEmailAsync(int userId, DateTime appointmentDate, string timeSlot, string serviceType);
}