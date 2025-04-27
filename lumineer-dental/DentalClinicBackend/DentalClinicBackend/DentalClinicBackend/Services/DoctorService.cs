using DentalClinicBackend.Data;
using DentalClinicBackend.DTOs;
using DentalClinicBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicBackend.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly ApplicationDbContext _context;

        public DoctorService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<DoctorDto>> GetAllDoctorsAsync()
        {
            return await _context.Doctors
                .Select(d => new DoctorDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    Specialty = d.Specialty,
                    Title = d.Title,
                    ImageUrl = d.ImageUrl,
                    AvailableTimeSlots = d.AvailableTimeSlots
                })
                .ToListAsync();
        }

        public async Task<DoctorDto> AddDoctorAsync(DoctorDto doctorDto)
        {
            var doctor = new Doctor
            {
                Name = doctorDto.Name,
                Specialty = doctorDto.Specialty,
                Title = doctorDto.Title,
                ImageUrl = doctorDto.ImageUrl,
                AvailableTimeSlots = doctorDto.AvailableTimeSlots
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            doctorDto.Id = doctor.Id;
            return doctorDto;
        }

        public async Task<List<string>> GetAvailableTimeSlotsAsync(int doctorId, DateTime date)
        {
            var doctor = await _context.Doctors
                .Include(d => d.Appointments.Where(a => a.AppointmentDate.Date == date.Date))
                .FirstOrDefaultAsync(d => d.Id == doctorId);

            if (doctor == null)
                throw new KeyNotFoundException("Doctor not found");

            var bookedSlots = doctor.Appointments
                .Select(a => a.TimeSlot)
                .ToList();

            return doctor.AvailableTimeSlots
                .Except(bookedSlots)
                .ToList();
        }

        public async Task<bool> UpdateDoctorScheduleAsync(int doctorId, List<string> timeSlots)
        {
            var doctor = await _context.Doctors.FindAsync(doctorId);
            if (doctor == null)
                return false;

            doctor.AvailableTimeSlots = timeSlots;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
