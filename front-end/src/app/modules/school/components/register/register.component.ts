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
    //this.subjects = [];
    this.formGroup = this.formBuild.group({
      name: this.formBuild.control(this.school.name, [
        Validators.required,
        Validators.minLength(Size.SCHOOL_NAME_MIN_LENGTH),
        Validators.maxLength(Size.SCHOOL_NAME_MAX_LENGTH),
      ]),
      types: this.formBuild.control(''),
      //subjects: this.formBuild.array([]),
    });
  }

  ngOnInit(): void {}

  handleSubmit(): void {
    // this.profileSubmit.emit();
    this.schoolService.registerSchoolProfile(this.formGroup.value).subscribe({
      next: (response) => {
        this.router.navigate([]);
        console.log('kyss');
      },
      error: (response) => {
        console.log(this.formGroup.get('types')?.value);
      },
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
