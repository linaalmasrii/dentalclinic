using DentalClinicBackend.DTOs;

namespace DentalClinicBackend.Services
{
public interface IDoctorService
{
    Task<List<DoctorDto>> GetAllDoctorsAsync();
    Task<DoctorDto> GetDoctorByIdAsync(int id);
    Task<List<string>> GetAvailableTimeSlotsAsync(int doctorId, DateTime date);
    Task<DoctorDto> AddDoctorAsync(DoctorDto doctorDto);
    Task<bool> UpdateDoctorScheduleAsync(int doctorId, List<string> timeSlots);
}
}