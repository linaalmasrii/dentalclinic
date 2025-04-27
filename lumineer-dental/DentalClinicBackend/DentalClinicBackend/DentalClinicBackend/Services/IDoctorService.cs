using DentalClinicBackend.DTOs;

namespace DentalClinicBackend.Services
{
    public interface IDoctorService
    {
        Task<List<DoctorDto>> GetAllDoctorsAsync();
        Task<DoctorDto> AddDoctorAsync(DoctorDto doctorDto);
        Task<List<string>> GetAvailableTimeSlotsAsync(int doctorId, DateTime date);  
    }
}
