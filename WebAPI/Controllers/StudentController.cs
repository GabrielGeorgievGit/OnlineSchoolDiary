using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Queries;
namespace WebAPI.Controllers {
    public class StudentController : Controller {
        
        
        [HttpGet("")]
        public String[] getStudents() {
            return null;//Signer.grade;
        }

        [HttpPost("")]
        public IActionResult addStudent(String studentName) {
            //add student to the database


            return Created("~api/login", studentName);
        }
    }
}
