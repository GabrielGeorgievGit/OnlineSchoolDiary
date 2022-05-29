using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Queries;

namespace WebAPI.Controllers {
    [Route("api/school/grade")]
    [ApiController]
    public class GradeController : Controller {

        public GradeController() {}

        [HttpGet("")]
        public Grade getSchoolGrade() {
            return Finder.grade;
        }

        [HttpPost("")]
        public IActionResult sendGrade(ClassGrade classGrade) {
            Grade grade;
            gradeQuery query = new gradeQuery();
            grade = query.findGrade(classGrade);
            Console.WriteLine(grade.classNumber + grade.grade);

            return Created("~api/school/grade", grade);
        }
    }
}
