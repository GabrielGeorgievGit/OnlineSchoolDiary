import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { Teacher } from 'src/app/models/Teacher';
import { SchoolService } from 'src/app/Services/school.service';
import { StudentService } from 'src/app/Services/student.service';
import { Size } from 'src/app/shared/const/Size';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css'],
})
export class RegisterStudentComponent implements OnInit {
  idGrade: number;
  formGroup: FormGroup;

  @Input() set student(value: Student) {
    if (value) {
      this.formGroup.patchValue(value);
    }
  }
  @Output() profileSubmit: EventEmitter<Student> = new EventEmitter();
  constructor(
    private readonly formBuild: FormBuilder,
    private readonly studentService: StudentService,
    private readonly router: Router
  ) {
    this.idGrade = 0;
    this.formGroup = formBuild.group({
      fullName: this.formBuild.control('', [
        Validators.required,
        Validators.minLength(Size.FULLNAME_MIN_LENGTH),
        Validators.maxLength(Size.FULLNAME_MAX_LENGTH),
      ]),
    });
  }

  ngOnInit(): void {}

  handleSubmit() {
    let student = {} as Student;
    student.fullName = this.formGroup.get('fullName')?.value;
    student.idGrade = this.idGrade;
    this.studentService.registerStudentProfile(student).subscribe({
      next: (response) => {
        alert('Successfully added student');
      },
      error: (response) => {
        console.log(response);
        alert('Unsuccessfull add');
      },
    });
  }
}
