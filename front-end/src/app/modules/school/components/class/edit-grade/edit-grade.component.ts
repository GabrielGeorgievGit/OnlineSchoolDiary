import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grade } from 'src/app/models/Grade';
import { Student } from 'src/app/models/Student';
import { GradeService } from 'src/app/Services/grade.service';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.css'],
})
export class EditGradeComponent implements OnInit {
  teacher = 'None';
  grade: Grade = {
    id: 1,
    classNumber: 1,
    grade: 'a',
    schoolName: 'School',
    teacherName: 'Teacher',
  };
  displayedColumns: string[] = ['name'];
  students: Student[];
  dataSource: Student[];
  newStudent: string;
  static reload: boolean = false;
  idGrade: number = 0;

  constructor(
    private readonly router: Router,
    private readonly gradeService: GradeService,
    private readonly studentService: StudentService
  ) {
    this.students = [];
    this.dataSource = [];

    this.newStudent = '';

    this.gradeService.getCurrentGrade().subscribe({
      next: (response) => {
        this.grade = { ...response };
        if (this.grade.teacherName === '') {
          this.grade.teacherName = 'None';
        }
        this.teacher = this.grade.teacherName;
        this.idGrade = this.grade.id;
      },
    });

    this.gradeService.getSchoolStudents().subscribe({
      next: (response) => {
        this.dataSource = response;
      },
      error: (response) => console.log(response),
    });
  }

  ngOnInit(): void {}

  editStudent(student: string) {
    this.router.navigate(['school-admin/school/grade/student']);
  }

  addStudent(name: string) {
    let student = {} as Student;
    student.name = name;
    student.idGrade = this.idGrade;
    console.log(student);

    this.studentService.registerStudentProfile(student).subscribe({
      next: (response) => {
        alert('Successfully added student');
        this.ngOnInit();
      },
      error: (response) => {
        console.log(response);
        alert('Student not added');
      },
    });

    window.location.reload();
  }

  editSubjects() {
    this.router.navigate(['school-admin/school/grade/subjects']);
  }

  changeTeacher() {
    this.router.navigate(['school-admin/school/grade/teacher']);
  }
  toClasses() {
    this.router.navigate(['school-admin/school/classes']);
  }
}
