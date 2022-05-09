import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { School } from 'src/app/models/School';
import { SchoolService } from 'src/app/Services/school.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  classes = Array(12).fill(false);
  subjects: string[];

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
    this.subjects = [];
    this.formGroup = this.formBuild.group({
      name: this.formBuild.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      classes: this.formBuild.control('', [Validators.required]),
      subjects: this.formBuild.array([]),
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
        console.log(this.formGroup.get('classes')?.value);
      },
    });
  }

  get subjectsFormArray() {
    return this.formGroup.get('subjects') as FormArray;
  }

  addSubject() {
    this.subjectsFormArray.push(
      this.formBuild.group({
        name: ['', Validators.required],
      })
    );
  }

  removeSubject(index: number) {
    this.subjectsFormArray.removeAt(index);
  }

  // get classes() {
  //   return this.formGroup.get('classesNums') as FormArray;
  // }
}
