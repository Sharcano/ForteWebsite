using Microsoft.AspNetCore.Mvc;
using ForteWebsite.Data; // YourDbContext için namespace
using ForteWebsite.Models; // Employee modeli için namespace

namespace ForteWebsite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly Data.AppDbContext _context;

        public EmployeeController(Data.AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {

            var employees = _context.Employees.ToList(); // Veritabanından tüm verileri çeker
            return Ok(employees); // JSON formatında döner
        }
    }
}
