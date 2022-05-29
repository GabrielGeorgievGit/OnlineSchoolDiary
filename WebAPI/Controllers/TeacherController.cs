using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Queries;
namespace WebAPI.Controllers
{
    [Route("api/school/teachera")]
    [ApiController]
    public class TeacherController : Controller
    {



        [HttpPost("")]
        public IActionResult registerTeacher(Teacher teacher)
        {

            TeacherQuery query = new TeacherQuery();
            Teacher t = query.registerTeacher(teacher);

                return Created("~api/school/teacher", t);
        }

    }
}
