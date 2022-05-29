using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Queries;

namespace WebAPI.Controllers {

    [Route("api/school/classes")]
    [ApiController]
    public class ClassesController : Controller {
        public ClassesController() {
            
        }

        [HttpGet("")]
        public SchoolClass[] getSchoolClasses() {
            string schoolType = Finder.school.Type;
            string[] classes;
            switch (schoolType) {
                case "ОУ": classes = new string[] { "1", "2", "3", "4", "5", "6", "7" }; break;
                case "СУ": classes = new string[] {"8", "9", "10", "11", "12" }; break;
                default:
                    classes = new string[] { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" }; break;
            }
            SchoolClass[] schoolClasses = new SchoolClass[12];
            for (int i = 0; i < schoolClasses.Length; i++) {
                schoolClasses[i].num = classes[i];
                schoolClasses[i].terms = new string[] { "a", "b", "c", "d", "e"};
            }
            return schoolClasses;
        }

        [HttpPost("")]
        public IActionResult registerSchool(School school) {
            return null;
        }
    }
}
