using Microsoft.AspNetCore.Mvc;

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
        public IEnumerable<string> GetTModels()
        {
            return new string[] { "Atlanta", "New Yourk", "Ivan" };
        }

        [HttpPost("")]
        public IActionResult registerSchool(School school)
        {
            Console.WriteLine("School name: " + school.Name);
            Console.WriteLine("School type: " + school.Type);

            return Created("~api/school", school);
        }
    }
}