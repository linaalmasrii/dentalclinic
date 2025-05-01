using DentalClinicBackend.DTOs;
using DentalClinicBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DentalClinicBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;
        private readonly IEmailService _emailService; // Add this line

        public AppointmentController(IAppointmentService appointmentService, IEmailService emailService) // Update constructor
        {
            _appointmentService = appointmentService;
            _emailService = emailService;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<AppointmentDto>> CreateAppointment(AppointmentDto appointmentDto)
        {
            try
            {
                Console.WriteLine($"Received appointment request: UserId={appointmentDto.UserId}, DoctorId={appointmentDto.DoctorId}, Date={appointmentDto.AppointmentDate}, Time={appointmentDto.TimeSlot}");

                var existingAppointment = await _appointmentService.GetAppointmentByDoctorAndTimeAsync(
                    appointmentDto.DoctorId,
                    appointmentDto.AppointmentDate,
                    appointmentDto.TimeSlot
                );

                if (existingAppointment != null)
                {
                    return BadRequest("This time slot is already booked. Please select another time.");
                }

                var result = await _appointmentService.CreateAppointmentAsync(appointmentDto);

                await _emailService.SendAppointmentConfirmationEmailAsync(
                    appointmentDto.UserId,
                    result.AppointmentDate,
                    result.TimeSlot,
                    result.ServiceType
                );

                return Ok(new { 
                    message = "Appointment has been scheduled successfully. A confirmation email will be sent shortly.",
                    appointment = result 
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating appointment: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("history/{userId}")]
        [Authorize]
        public async Task<ActionResult<List<AppointmentDto>>> GetAppointmentHistory(string userId)
        {
            try
            {
                var appointments = await _appointmentService.GetUserAppointmentsAsync(int.Parse(userId));
                appointments = appointments.OrderByDescending(a => a.AppointmentDate)
                                           .ThenBy(a => a.TimeSlot)
                                           .ToList();
                return Ok(appointments);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching appointment history: {ex.Message}");
                return BadRequest("Failed to fetch appointment history");
            }
        }

        [HttpGet("available-slots")]
        public async Task<ActionResult<List<string>>> GetAvailableTimeSlots(
            [FromQuery] int doctorId,
            [FromQuery] DateTime date)
        {
            try
            {
                var availableSlots = await _appointmentService.GetAvailableTimeSlotsAsync(doctorId, date);
                return Ok(availableSlots);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Receptionist,Doctor")]
        public async Task<ActionResult<AppointmentDto>> UpdateAppointmentStatus(
            int id,
            [FromBody] UpdateAppointmentStatusDto updateDto)
        {
            try
            {
                var result = await _appointmentService.UpdateAppointmentStatusAsync(
                    id,
                    updateDto.Status,
                    updateDto.Notes);
                return Ok(result);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("pending")]
        [Authorize(Roles = "Receptionist,Doctor")]
        public async Task<ActionResult<List<AppointmentDto>>> GetPendingAppointments()
        {
            var appointments = await _appointmentService.GetPendingAppointmentsAsync();
            return Ok(appointments);
        }

        [HttpGet("doctor/{doctorId}")]
        [Authorize]
        public async Task<ActionResult<List<AppointmentDto>>> GetDoctorAppointments(int doctorId)
        {
            var appointments = await _appointmentService.GetDoctorAppointmentsAsync(doctorId);
            return Ok(appointments);
        }

        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<ActionResult<List<AppointmentDto>>> GetUserAppointments(int userId)
        {
            var appointments = await _appointmentService.GetUserAppointmentsAsync(userId);
            return Ok(appointments);
        }
    }
}
