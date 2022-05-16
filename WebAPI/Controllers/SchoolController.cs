using Microsoft.AspNetCore.Mvc;
using WebAPI.Queries;

namespace WebAPI.Controllers
{
    [Route("api/school")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
        public SchoolController()
        {
        }

        [HttpGet("")]
        public School getSchool()
        {
            return Finder.school;
        }

        [HttpPost("")]
        public IActionResult registerSchool(School school)
        {
            Console.WriteLine("School name: " + school.Name);
            Console.WriteLine("School type: " + school.Type);

            //Finder.school = Finder.findSchool(school);

            return Created("~api/school", Finder.school);
        }

        [HttpPut("")]
        public IActionResult editSchool(School school)
        {
            Console.WriteLine("Edit School name: " + school.Name);
            Console.WriteLine("Edit School type: " + school.Type);

            return Created("~api/school", Finder.school);
        }
    }
}