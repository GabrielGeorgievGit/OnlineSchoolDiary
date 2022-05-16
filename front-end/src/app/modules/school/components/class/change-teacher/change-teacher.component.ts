import { Component, OnInit } from '@angular/core';
import { Grade } from 'src/app/models/Grade';
import { Teacher } from 'src/app/models/Teacher';
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
  constructor(private readonly teacherService: TeacherService) {
    this.grade = EditGradeComponent.grade;
    this.teacher = 'name';
    this.teachers = [];
    this.teachers.push({
      email: 'email',
      fullName: 'name',
      id: 1,
      idSchool: 1,
      password: 'password',
    });
  }

  ngOnInit(): void {}

  changeTeacher() {
    let teacher = {} as Teacher;
    this.teachers.forEach((t) => {
      if (t.fullName === this.teacher) teacher = t;
    });
    this.teacherService.editTeacher(teacher).subscribe({
      next: (response) => {
        alert('Class teacher is changed');
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
