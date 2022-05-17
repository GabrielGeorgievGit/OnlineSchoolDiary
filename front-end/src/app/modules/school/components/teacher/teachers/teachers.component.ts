import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/Teacher';
import { SchoolService } from 'src/app/Services/school.service';
import { MatTableDataSource } from '@angular/material/table';
import { Size } from 'src/app/shared/const/Size';
import { LoginComponent } from '../../../../../login/login.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  hidePassword = true;
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
      fullName: this.formBuild.control('', [
        Validators.required,
        Validators.minLength(Size.FULLNAME_MIN_LENGTH),
        Validators.maxLength(Size.FULLNAME_MAX_LENGTH),
      ]),
      email: this.formBuild.control('', [
        Validators.required,
        Validators.minLength(Size.EMAIL_MIN_LENGTH),
        Validators.maxLength(Size.EMAIL_MAX_LENGTH),
      ]),
      password: this.formBuild.control('', [
        Validators.required,
        Validators.minLength(Size.PASSWORD_MIN_LENGTH),
        Validators.maxLength(Size.PASSWORD_MAX_LENGTH),
      ]),
      repeatPassword: this.formBuild.control('', [
        Validators.required,
        Validators.minLength(Size.PASSWORD_MIN_LENGTH),
        Validators.maxLength(Size.PASSWORD_MAX_LENGTH),
      ]),
    });

    this.teachers.push({
      id: 0,
      fullName: 'Ivan',
      email: 'ivan@ivan.iv',
      password: 'vanko123',
      idSchool: 1,
    });
  }

  ngOnInit(): void {}

  handleSubmit() {
    
    this.profileSubmit.emit(this.formGroup.value);
    console.log(this.formGroup.value);
    this.schoolService.registerTeacher({ id: 2, email: this.formGroup.get('email')?.value, fullName: this.formGroup.get('fullName')?.value, idSchool: LoginComponent.loggedUser?.schoolId, password: this.formGroup.get('password')?.value }).subscribe({
    });
  }

  addTeacher() {}
}
