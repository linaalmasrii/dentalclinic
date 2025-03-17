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

        public AppointmentController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<AppointmentDto>> CreateAppointment(AppointmentDto appointmentDto)
        {
            try
            {
                var result = await _appointmentService.CreateAppointmentAsync(appointmentDto);
                return Ok(result);
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
