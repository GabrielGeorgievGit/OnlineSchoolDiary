import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/Teacher';
import { TeacherService } from 'src/app/Services/teacher.service';
import { Store } from 'src/app/shared/objects/Store';

@Component({
  selector: 'app-show-teachers',
  templateUrl: './show-teachers.component.html',
  styleUrls: ['./show-teachers.component.css'],
})
export class ShowTeachersComponent implements OnInit {
  teachers: Teacher[];
  constructor(
    private readonly router: Router,
    private readonly teacherService: TeacherService
  ) {
    this.teachers = [];
  }

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe({
      next: (response) => {
        response.forEach((teacher) => this.teachers.push(teacher));
      },
      error: (response) => console.log(response),
    });
  }

  newTeacher() {
    this.router.navigate(['school-admin/school/teachers/new']);
  }

  editTeacher(i: number) {
    Store.teacher = this.teachers[i];

    this.router.navigate([`school-admin/school/teachers/edit`]);
  }

  toEditSchool() {
    this.router.navigate(['school-admin/school/edit']);
  }
}
