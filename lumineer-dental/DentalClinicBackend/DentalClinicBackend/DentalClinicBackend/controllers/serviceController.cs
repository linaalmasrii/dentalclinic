using Microsoft.AspNetCore.Mvc;
using DentalClinicBackend.Models;
using DentalClinicBackend.Data; 
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ServicesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ServicesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetServices()
    {
        var services = await _context.Services.ToListAsync();
        return Ok(services);
    }
}