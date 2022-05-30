import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grade } from 'src/app/models/Grade';
import { Teacher } from 'src/app/models/Teacher';
import { GradeService } from 'src/app/Services/grade.service';
import { TeacherService } from 'src/app/Services/teacher.service';
import { EditGradeComponent } from '../edit-grade/edit-grade.component';

@Component({
  selector: 'app-change-teacher',
  templateUrl: './change-teacher.component.html',
  styleUrls: ['./change-teacher.component.css'],
})
export class ChangeTeacherComponent implements OnInit {
  grade: Grade;
  teacher: string;
  teachers: Teacher[];
  idGrade: number = 0;
  constructor(
    private readonly teacherService: TeacherService,
    private readonly gradeService: GradeService,
    private readonly router: Router
  ) {
    this.grade = {
      id: 1,
      classNumber: 1,
      grade: 'a',
      schoolName: 'School',
      teacherName: 'Teacher',
    };
    gradeService.getCurrentGrade().subscribe({
      next: (response) => {
        this.grade = { ...response };
        if (this.grade.teacherName === '') {
          this.grade.teacherName = 'None';
        }
        this.idGrade = this.grade.id;
      },
    });

    this.teacher = '';
    this.teachers = [];
    this.teacherService.getNotGradeTeachers().subscribe({
      next: (response) => {
        response.forEach((t) => this.teachers.push(t));
      },
    });
    // this.teachers.push({
    //   email: 'email',
    //   fullName: 'name',
    //   id: 1,
    //   idSchool: 1,
    //   password: 'password',
    // });
  }

  ngOnInit(): void {}

  changeTeacher() {
    if (this.teacher === '') {
      alert('Select a teacher!');
      return;
    }

    let teacher = {} as Teacher;
    this.teachers.forEach((t) => {
      if (t.fullName === this.teacher) teacher = t;
    });

    this.teacherService.editTeacher(teacher).subscribe({
      next: (response) => {
        alert('Class teacher is changed');
        this.router.navigate([`school-admin`]);
        this.router.navigate([`school-admin/school/grade`]);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
