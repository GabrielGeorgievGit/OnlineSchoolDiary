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

  ngOnInit(): void {
    this.schoolService.getSchoolProfile().subscribe((data) => {
      console.log(data);
    });
  }

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

  // get subjectsFormArray() {
  //   return this.formGroup.get('subjects') as FormArray;
  // }

  // addSubject() {
  //   this.subjectsFormArray.push(
  //     this.formBuild.group({
  //       name: ['', Validators.required],
  //     })
  //   );
  // }

  // removeSubject(index: number) {
  //   this.subjectsFormArray.removeAt(index);
  // }

  // static classesGet(): string[] {
  //   let arr = ['Pre-school'];
  //   for (let i = 1; i < 13; ++i) {
  //     arr.push('' + i);
  //   }
  //   return arr;
  // }
}
