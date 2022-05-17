import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/Teacher';
import { TeacherService } from 'src/app/Services/teacher.service';
import { Store } from 'src/app/shared/objects/Store';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css'],
})
export class EditTeacherComponent implements OnInit {
  teacher: Teacher;
  constructor(private readonly teacherService: TeacherService) {
    this.teacher = Store.teacher;
  }

  ngOnInit(): void {}

  handleSubmit() {
    this.teacherService.editTeacher(this.teacher).subscribe({
      next: (response) => {
        alert('Successfully changed');
      },
      error: (response) => console.log(response),
    });
  }
}
