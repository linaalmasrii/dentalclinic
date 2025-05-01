using DentalClinicBackend.Data;
using DentalClinicBackend.DTOs;
using DentalClinicBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicBackend.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly ApplicationDbContext _context;

        public AppointmentService(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<bool> IsTimeSlotAvailable(int doctorId, DateTime date, string timeSlot)
        {
            return !await _context.Appointments
                .AnyAsync(a => a.DoctorId == doctorId &&
                              a.AppointmentDate.Date == date.Date &&
                              a.TimeSlot == timeSlot &&
                              a.Status != "Cancelled");
        }

        public async Task<AppointmentDto> CreateAppointmentAsync(AppointmentDto appointmentDto)
        {
            bool isAvailable = await IsTimeSlotAvailable(
                appointmentDto.DoctorId,
                appointmentDto.AppointmentDate,
                appointmentDto.TimeSlot
            );

            if (!isAvailable)
            {
                throw new InvalidOperationException("This time slot is already booked. Please select another time.");
            }

            var appointment = new Appointment
            {
                UserId = appointmentDto.UserId,
                DoctorId = appointmentDto.DoctorId,
                AppointmentDate = appointmentDto.AppointmentDate,
                TimeSlot = appointmentDto.TimeSlot,
                ServiceType = appointmentDto.ServiceType,
                Status = "Pending"
            };
           // to save to database 
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
// return the appointment id 
            appointmentDto.Id = appointment.Id;
            return appointmentDto;
        }

        public async Task<AppointmentDto> UpdateAppointmentStatusAsync(int id, string status, string? notes)
        {
            var appointment = await _context.Appointments
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (appointment == null)
                throw new KeyNotFoundException("Appointment not found");

            appointment.Status = status;

            if (status == "Completed" && !string.IsNullOrEmpty(notes))
            {
                var patientHistory = new PatientHistory
                {
                    UserId = appointment.UserId,
                    VisitDate = appointment.AppointmentDate,
                    Treatment = appointment.ServiceType,
                    DoctorNotes = notes,
                    AppointmentId = appointment.Id
                };

                _context.PatientHistories.Add(patientHistory);
            }

            await _context.SaveChangesAsync();

            return new AppointmentDto
            {
                Id = appointment.Id,
                UserId = appointment.UserId,
                DoctorId = appointment.DoctorId,
                AppointmentDate = appointment.AppointmentDate,
                TimeSlot = appointment.TimeSlot,
                ServiceType = appointment.ServiceType,
                Status = appointment.Status
            };
        }

        public async Task<List<AppointmentDto>> GetPendingAppointmentsAsync()
        {
            return await _context.Appointments
                .Where(a => a.Status == "Pending")
                .Select(a => new AppointmentDto
                {
                    Id = a.Id,
                    UserId = a.UserId,
                    DoctorId = a.DoctorId,
                    AppointmentDate = a.AppointmentDate,
                    TimeSlot = a.TimeSlot,
                    ServiceType = a.ServiceType,
                    Status = a.Status
                })
                .ToListAsync();
        }

        public async Task<List<AppointmentDto>> GetDoctorAppointmentsAsync(int doctorId)
        {
            return await _context.Appointments
                .Where(a => a.DoctorId == doctorId)
                .Select(a => new AppointmentDto
                {
                    Id = a.Id,
                    UserId = a.UserId,
                    DoctorId = a.DoctorId,
                    AppointmentDate = a.AppointmentDate,
                    TimeSlot = a.TimeSlot,
                    ServiceType = a.ServiceType,
                    Status = a.Status
                })
                .ToListAsync();
        }

        public async Task<List<AppointmentDto>> GetUserAppointmentsAsync(int userId)
        {
            return await _context.Appointments
                .Where(a => a.UserId == userId)
                .Select(a => new AppointmentDto
                {
                    Id = a.Id,
                    UserId = a.UserId,
                    DoctorId = a.DoctorId,
                    AppointmentDate = a.AppointmentDate,
                    TimeSlot = a.TimeSlot,
                    ServiceType = a.ServiceType,
                    Status = a.Status
                })
                .ToListAsync();
        }

        public async Task<List<string>> GetAvailableTimeSlotsAsync(int doctorId, DateTime date)
        {
            var allTimeSlots = new List<string>
            {
                "09:00 AM", "10:00 AM", "11:00 AM",
                "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
            };

            var bookedSlots = await _context.Appointments
                .Where(a => 
                    a.DoctorId == doctorId &&
                    a.AppointmentDate.Date == date.Date &&
                    a.Status != "Cancelled")
                .Select(a => a.TimeSlot)
                .ToListAsync();

            return allTimeSlots.Except(bookedSlots).ToList();
        }

        public async Task<AppointmentDto> GetAppointmentByDoctorAndTimeAsync(int doctorId, DateTime date, string timeSlot)
        {
            var appointment = await _context.Appointments
                .FirstOrDefaultAsync(a => 
                    a.DoctorId == doctorId &&
                    a.AppointmentDate.Date == date.Date &&
                    a.TimeSlot == timeSlot &&
                    a.Status != "Cancelled");

            if (appointment == null)
                return null;

            return new AppointmentDto
            {
                Id = appointment.Id,
                UserId = appointment.UserId,
                DoctorId = appointment.DoctorId,
                AppointmentDate = appointment.AppointmentDate,
                TimeSlot = appointment.TimeSlot,
                ServiceType = appointment.ServiceType,
                Status = appointment.Status
            };
        }
    }
}