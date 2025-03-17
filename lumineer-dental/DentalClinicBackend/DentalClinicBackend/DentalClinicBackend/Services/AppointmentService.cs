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

        public async Task<AppointmentDto> CreateAppointmentAsync(AppointmentDto appointmentDto)
        {
            var appointment = new Appointment
            {
                UserId = appointmentDto.UserId,
                DoctorId = appointmentDto.DoctorId,
                AppointmentDate = appointmentDto.AppointmentDate,
                TimeSlot = appointmentDto.TimeSlot,
                ServiceType = appointmentDto.ServiceType,
                Status = "Pending"
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

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
    }
}