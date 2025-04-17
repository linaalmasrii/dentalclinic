using DentalClinicBackend.DTOs;

namespace DentalClinicBackend.Services
{
    public interface IAppointmentService
    {
        Task<AppointmentDto> CreateAppointmentAsync(AppointmentDto appointmentDto);
        Task<AppointmentDto> UpdateAppointmentStatusAsync(int id, string status, string? notes);
        Task<List<AppointmentDto>> GetPendingAppointmentsAsync();
        Task<List<AppointmentDto>> GetDoctorAppointmentsAsync(int doctorId);
        Task<List<AppointmentDto>> GetUserAppointmentsAsync(int userId);
        Task<List<string>> GetAvailableTimeSlotsAsync(int doctorId, DateTime date);
        Task<AppointmentDto> GetAppointmentByDoctorAndTimeAsync(int doctorId, DateTime date, string timeSlot);
    }
}    