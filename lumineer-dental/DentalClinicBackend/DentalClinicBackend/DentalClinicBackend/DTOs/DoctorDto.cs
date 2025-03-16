

namespace DentalClinicBackend.DTOs
{
    public class DoctorDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Specialty { get; set; }= String.Empty;
        public string ImageUrl { get; set; }= String.Empty;
        public List<string> AvailableTimeSlots { get; set; } = new List<string>();
    }
}