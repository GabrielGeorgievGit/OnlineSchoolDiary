import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/Teacher';
import { SchoolService } from 'src/app/Services/school.service';
import { MatTableDataSource } from '@angular/material/table';
import { Size } from 'src/app/shared/const/Size';
import { LoginComponent } from '../../../../../login/login.component';
import { TeacherService } from 'src/app/Services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  hidePassword = true;
  formGroup: FormGroup;
  dataSource = new MatTableDataSource<Teacher>();

  @Input() set teacher(value: Teacher) {
    if (value) {
      this.formGroup.patchValue(value);
    }
  }
  @Output() profileSubmit: EventEmitter<Teacher> = new EventEmitter();
  constructor(
    private readonly formBuild: FormBuilder,
    private readonly teacherService: TeacherService,
    private readonly router: Router
  ) {
    this.formGroup = formBuild.group(
      {
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
      },
      { validator: this.checkPasswords }
    );
  }
  checkPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('repeatPassword')?.value;

    return pass === confirmPass ? null : { notSame: true };
  }
  ngOnInit(): void {}

  handleSubmit() {
    this.profileSubmit.emit(this.formGroup.value);
    console.log(this.formGroup.value);
    this.teacherService
      .registerTeacher({
        id: -50, //without id
        email: this.formGroup.get('email')?.value,
        fullName: this.formGroup.get('fullName')?.value,
        idSchool: -50,
        password: this.formGroup.get('password')?.value,
      })
      .subscribe({
        next: (response) => {
          alert('Successfully added teacher');
          this.router.navigate([`school-admin/school/teachers`]);
        },
      });
  }
}
