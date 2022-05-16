import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grade } from 'src/app/models/Grade';
import { Student } from 'src/app/models/Student';
import { GradeService } from 'src/app/Services/grade.service';

@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.css'],
})
export class EditGradeComponent implements OnInit {
  public static grade: Grade = {
    id: 1,
    classNumber: 1,
    grade: 'a',
    schoolName: 'School',
    teacherName: 'Teacher',
  };
  grade: Grade;
  displayedColumns: string[] = ['fullName'];
  students: Student[];
  dataSource: Student[];
  newStudent: string;

  constructor(
    private readonly router: Router,
    private readonly gradeService: GradeService
  ) {
    this.grade = EditGradeComponent.grade;
    this.students = [];
    this.students.push({
      fullName: 'Ivan Hristov Blagoev',
      idGrade: 1,
    });

    this.dataSource = this.students;

    this.newStudent = '';
  }

  ngOnInit(): void {
    this.gradeService.getSchoolStudents().subscribe({
      next: (response) => {
        response.forEach((s) =>
          this.students.push({ fullName: s, idGrade: this.grade.id })
        );
      },
      error: (response) => console.log(response),
    });
  }

  editStudent(student: string) {
    console.log(student);
    this.router.navigate(['school-admin/school/classes']);
  }

  addStudent(student: string) {
    console.log(this.dataSource);
    this.students.push({ fullName: student, idGrade: this.grade.id });

    window.location.reload();
  }

  editSubjects() {
    this.router.navigate(['school-admin/school/grade/subjects']);
  }

  changeTeacher() {
    this.router.navigate(['school-admin/school/grade/teacher']);
  }
}
