import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/Teacher';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css'],
})
export class EditTeacherComponent implements OnInit {
  teacher: Teacher;
  constructor() {
    this.teacher = {
      id: 0,
      fullName: 'Ivan',
      email: 'ivan@ivan.iv',
      password: 'vanko123',
      idSchool: 1,
    };
  }

  ngOnInit(): void {}

  handleSubmit() {}
}
