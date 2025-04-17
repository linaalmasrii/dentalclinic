using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DentalClinicBackend.Data;
using DentalClinicBackend.Models;
using DentalClinicBackend.Services.Interfaces;

namespace DentalClinicBackend.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly ApplicationDbContext _context;

        public AppointmentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AppointmentDto> GetAppointmentByDoctorAndTimeAsync(
            string doctorName, 
            DateTime date,
            string time)
        {
            return await _context.Appointments
                .Where(a => a.DoctorName == doctorName &&
                       a.AppointmentDate.Date == date.Date &&
                       a.AppointmentTime == time &&
                       a.Status != "Cancelled")
                .Select(a => new AppointmentDto
                {
                    Id = a.Id,
                    DoctorName = a.DoctorName,
                    AppointmentDate = a.AppointmentDate,
                    AppointmentTime = a.AppointmentTime,
                    // ... map other properties
                })
                .FirstOrDefaultAsync();
        }

        public async Task<List<string>> GetAvailableTimeSlotsAsync(string doctorName, DateTime date)
        {
            // Define all possible time slots
            var allTimeSlots = new List<string>
            {
                "09:00 AM", "10:00 AM", "11:00 AM",
                "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
            };

            // Get booked appointments for the specified doctor and date
            var bookedSlots = await _context.Appointments
                .Where(a => a.DoctorName == doctorName &&
                       a.AppointmentDate.Date == date.Date &&
                       a.Status != "Cancelled")
                .Select(a => a.AppointmentTime)
                .ToListAsync();

            // Return available time slots (all slots minus booked slots)
            return allTimeSlots.Except(bookedSlots).ToList();
        }
    }
} 