namespace DentalClinicBackend.DTOs
{
    public class UpdateAppointmentStatusDto
    {
        public string Status { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }
}
