namespace DentalClinicBackend.DTOs
{
    public class AppointmentDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int DoctorId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string? TimeSlot { get; set; } 
        public string? ServiceType { get; set; }
        public string Status { get; set; } = "Pending"; 
    }
}