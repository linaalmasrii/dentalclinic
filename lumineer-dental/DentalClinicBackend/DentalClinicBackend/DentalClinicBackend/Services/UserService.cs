using DentalClinicBackend.Data;
using DentalClinicBackend.DTOs;
using DentalClinicBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicBackend.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                throw new KeyNotFoundException("User not found");

            return new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                DateOfBirth = user.DateOfBirth,
                Gender = user.Gender
            };
        }

        public async Task<UserDto> UpdateUserAsync(int id, UserDto userDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                throw new KeyNotFoundException("User not found");

            user.FirstName = userDto.FirstName ?? user.FirstName;
            user.LastName = userDto.LastName ?? user.LastName;
            user.PhoneNumber = userDto.PhoneNumber ?? user.PhoneNumber;
            user.DateOfBirth = userDto.DateOfBirth ?? user.DateOfBirth;
            user.Gender = userDto.Gender ?? user.Gender;

            await _context.SaveChangesAsync();
            return userDto;
        }

        public async Task<PatientHistoryDto> GetPatientHistoryAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new KeyNotFoundException("User not found");

            return new PatientHistoryDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                DateOfBirth = user.DateOfBirth,
                Gender = user.Gender,
                HasAllergies = user.HasAllergies,
                Allergies = user.Allergies,
                TakingMedications = user.TakingMedications,
                Medications = user.Medications,
                HasDentalHistory = user.HasDentalHistory,
                DentalHistory = user.DentalHistory,
                HasSurgeries = user.HasSurgeries,
                Surgeries = user.Surgeries,
                HasAdditionalConcerns = user.HasAdditionalConcerns,
                AdditionalConcerns = user.AdditionalConcerns
            };
        }

        public async Task<bool> UpdatePatientHistoryAsync(int userId, PatientHistoryDto historyDto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return false;

            user.HasAllergies = historyDto.HasAllergies;
            user.Allergies = historyDto.Allergies;
            user.TakingMedications = historyDto.TakingMedications;
            user.Medications = historyDto.Medications;
            user.HasDentalHistory = historyDto.HasDentalHistory;
            user.DentalHistory = historyDto.DentalHistory;
            user.HasSurgeries = historyDto.HasSurgeries;
            user.Surgeries = historyDto.Surgeries;
            user.HasAdditionalConcerns = historyDto.HasAdditionalConcerns;
            user.AdditionalConcerns = historyDto.AdditionalConcerns;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}