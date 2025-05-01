
public class DoctorDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Specialty { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public List<string> AvailableTimeSlots { get; set; } = new();

    public int ServiceId { get; set; } // 1 doctor = 1 service
}
