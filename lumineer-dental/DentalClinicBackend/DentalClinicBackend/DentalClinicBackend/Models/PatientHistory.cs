using System.ComponentModel.DataAnnotations;

public class PatientHistory
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int AppointmentId { get; set; }
    public DateTime VisitDate { get; set; }
    [Required]
    public string Treatment { get; set; } = string.Empty;
    [Required]
    public string DoctorNotes { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
