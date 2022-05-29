﻿using Microsoft.AspNetCore.Mvc;
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
            return gradeQuery.findStudents(Finder.grade.id);
        }

        [HttpPost("")]
        public IActionResult sendGrade(ClassGrade classGrade) {
            Grade grade;
            gradeQuery query = new gradeQuery();
            grade = query.findGrade(classGrade);
            Console.WriteLine(grade.classNumber + grade.grade);

            return Created("~api/school/grade", grade);
        }

        [HttpPost("student")]
        public IActionResult addStudent(Student student) {
            Console.WriteLine(student.idGrade);
            gradeQuery.addStudent(student);

            return Created("~api/school/grade/student", student);
        }

        [HttpPut("teacher")]
        public IActionResult editGradeTeacher(Teacher teacher) {
            gradeQuery.changeTeacher(Finder.grade.id, teacher);

            return Created("~api/school/grade/teacher", teacher);
        }
    }
}
