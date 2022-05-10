import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/Teacher';
import { SchoolService } from 'src/app/Services/school.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  formGroup: FormGroup;
  dataSource = new MatTableDataSource<Teacher>();
  teachers: Teacher[];

  @Input() set teacher(value: Teacher) {
    if (value) {
      this.formGroup.patchValue(value);
    }
  }
  @Output() profileSubmit: EventEmitter<Teacher> = new EventEmitter();
  constructor(
    private readonly formBuild: FormBuilder,
    private readonly schoolService: SchoolService,
    private readonly router: Router
  ) {
    this.teachers = [];
    this.formGroup = formBuild.group({
      firstName: this.formBuild.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      secondName: this.formBuild.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      thirdName: this.formBuild.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      subjectOne: this.formBuild.control('', Validators.required),
      subjectTwo: this.formBuild.control(''),
    });

    this.teachers.push({
      id: 0,
      firstName: 'Ivan',
      secondName: 'Dimitrov',
      thirdName: 'Ivanov',
      subjectOne: 'Math',
      subjectTwo: 'None',
    });
  }

  ngOnInit(): void {}

  handleSubmit() {
    this.profileSubmit.emit(this.formGroup.value);
  }

  addTeacher() {}
}
