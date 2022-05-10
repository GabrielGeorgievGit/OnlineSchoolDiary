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
      firstName: 'Ivan',
      secondName: 'AA',
      thirdName: 'BB',
      subjectOne: 'MAT',
      subjectTwo: '',
    };
  }

  ngOnInit(): void {}

  handleSubmit() {}
}
