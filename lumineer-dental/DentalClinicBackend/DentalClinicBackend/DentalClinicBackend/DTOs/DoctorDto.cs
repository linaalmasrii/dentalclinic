

namespace DentalClinicBackend.DTOs
{
    public class DoctorDto
    {
public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Specialty { get; set; } = string.Empty; // Service they offer
    public string Title { get; set; } = string.Empty;     // Their professional title
    public string ImageUrl { get; set; } = string.Empty;
    public List<string> AvailableTimeSlots { get; set; } = new();
        
    }
}

