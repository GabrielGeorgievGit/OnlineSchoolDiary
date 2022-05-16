using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Queries;

namespace WebAPI.Controllers {
    [Route("api/school/grade")]
    [ApiController]
    public class GradeController : Controller {

        public GradeController() {}

        [HttpGet("")]
        public String[] getStudents() {
            return null;//Signer.grade;
        }

        [HttpPost("")]
        public IActionResult sendGrade(ClassGrade grade) {



            return Created("~api/login", Finder.grade);
        }
    }
}
