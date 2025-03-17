using DentalClinicBackend.DTOs;

namespace DentalClinicBackend.Services
{
    public interface IUserService
    {
        Task<UserDto> GetUserByIdAsync(int id);
        Task<UserDto> UpdateUserAsync(int id, UserDto userDto);
        Task<PatientHistoryDto> GetPatientHistoryAsync(int userId);
        Task<bool> UpdatePatientHistoryAsync(int userId, PatientHistoryDto historyDto);
    }
}
