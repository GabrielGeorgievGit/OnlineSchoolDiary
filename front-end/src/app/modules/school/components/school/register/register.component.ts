import { JsonpClientBackend } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { School } from 'src/app/models/School';
import { SchoolService } from 'src/app/Services/school.service';
import { Size } from 'src/app/shared/const/Size';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  types: string[];
  //subjects: string[];

  @Input() set school(value: School) {
    if (value) {
      this.formGroup.patchValue(value);
    }
  }
  @Output() profileSubmit: EventEmitter<School> = new EventEmitter<School>();
  constructor(
    private readonly formBuild: FormBuilder,
    private readonly schoolService: SchoolService,
    private readonly router: Router
  ) {
    this.types = RegisterComponent.getSchoolTypes();
    this.formGroup = this.formBuild.group({
      name: this.formBuild.control('', [
        Validators.required,
        Validators.minLength(Size.SCHOOL_NAME_MIN_LENGTH),
        Validators.maxLength(Size.SCHOOL_NAME_MAX_LENGTH),
      ]),
      type: this.formBuild.control(this.types[0]),
    });
  }

  ngOnInit(): void {}

  get form() {
    return this.formGroup.controls;
  }

  handleSubmit(): void {
    this.schoolService
      .registerSchoolProfile({
        name: this.form['name'].value,
        type: this.form['type'].value,
      })
      .subscribe({
        next: (response) => {
          alert(
            'Successfully registered ' + this.form['name'].value + ' school'
          );
          this.router.navigate(['school-admin/school/edit']);
        },
        error: (response) => {
          console.log(response);
        },
      });
    console.log({
      name: this.form['name'].value,
      type: this.form['type'].value,
    });
  }

  static getSchoolTypes(): string[] {
    return ['СОУ', 'ОУ', 'СУ'];
  }
}
