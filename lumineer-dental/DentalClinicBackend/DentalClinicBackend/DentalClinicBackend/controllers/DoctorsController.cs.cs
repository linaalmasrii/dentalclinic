using DentalClinicBackend.DTOs;
using DentalClinicBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DentalClinicBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public DoctorsController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        [HttpGet]
        public async Task<ActionResult<List<DoctorDto>>> GetAllDoctors()
        {
            var doctors = await _doctorService.GetAllDoctorsAsync();
            return Ok(doctors);
        }

        [HttpGet("{id}/available-slots")]
        public async Task<ActionResult<List<string>>> GetAvailableTimeSlots(int id, [FromQuery] DateTime date)
        {
            var slots = await _doctorService.GetAvailableTimeSlotsAsync(id, date);
            return Ok(slots);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<DoctorDto>> AddDoctor(DoctorDto doctorDto)
        {
            var result = await _doctorService.AddDoctorAsync(doctorDto);
            return Ok(result);
        }
    }
}
