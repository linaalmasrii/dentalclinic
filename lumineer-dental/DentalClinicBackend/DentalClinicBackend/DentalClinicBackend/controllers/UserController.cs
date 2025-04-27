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
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            Console.WriteLine("user: " + user);
            return Ok(user);
        }

        [HttpGet("{id}/history")]
        [Authorize]
        public async Task<ActionResult<PatientHistoryDto>> GetPatientHistory(int id)
        {
            var history = await _userService.GetPatientHistoryAsync(id);
            return Ok(history);
        }
    }
}
