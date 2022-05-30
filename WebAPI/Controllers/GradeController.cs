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

        [HttpGet("students")]
        public Student[] getSchoolGradeStudents() {
            return GradeQuery.findStudents(Finder.grade.id);
        }

        [HttpPost("")]
        public IActionResult sendGrade(ClassGrade classGrade) {
            Grade grade;
            GradeQuery query = new GradeQuery();
            grade = query.findGrade(classGrade);
            Console.WriteLine(grade.classNumber + grade.grade);

            return Created("~api/school/grade", grade);
        }

        [HttpPost("student")]
        public IActionResult addStudent(Student student) {
            Console.WriteLine(student.idGrade);
            GradeQuery.addStudent(student);

            return Created("~api/school/grade/student", student);
        }

        [HttpPut("teacher")]
        public IActionResult editGradeTeacher(Teacher teacher) {
            GradeQuery.changeTeacher(Finder.grade.id, teacher);

            return Created("~api/school/grade/teacher", teacher);
        }
        
        [HttpPost("subject-teacher")]
        public IActionResult addSubjectTeacher(GradeSubjectTeacher gst) {
            Console.WriteLine("in add subject teacher");
            GradeQuery.addSubjectTeacher(gst);

            return Created("~api/school/grade/subject-teacher", gst);
        }

        [HttpGet("subject-teachers")]
        public GradeSubjectTeacherPair[] getGradeSubjectTeachers() {
            return GradeQuery.getSubjectTeachers(Finder.grade.id);
        }

        [HttpDelete("subject-teachers/delete")]
        public IActionResult deleteGradeSubjectTeachers(GradeSubjectTeacher gst) {
            GradeQuery.deleteSubjectTeacher(gst);
            return Ok();
        }
    }
}
