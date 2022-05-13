import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/Teacher';

@Component({
  selector: 'app-show-teachers',
  templateUrl: './show-teachers.component.html',
  styleUrls: ['./show-teachers.component.css'],
})
export class ShowTeachersComponent implements OnInit {
  teachers: Teacher[];
  constructor(private readonly router: Router) {
    this.teachers = [];

    for (let i = 0; i < 30; ++i) {
      this.teachers.push({
        id: 0,
        fullName: 'Ivan',
        email: 'ivan@ivan.iv',
        password: 'vanko123',
        idSchool: 1,
      });
    }
  }

  ngOnInit(): void {}

  newTeacher() {
    this.router.navigate(['school/edit/teachers/new']);
  }

  editTeacher(i: number) {
    this.router.navigate([`/${this.teachers[i].id}`]);
  }
}
