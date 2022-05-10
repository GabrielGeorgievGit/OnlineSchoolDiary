import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { School } from 'src/app/models/School';
import { SchoolService } from 'src/app/Services/school.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  school: School;
  formGroup: FormGroup;
  classes = Array(12).fill(false);
  subjects: string[];

  // @Input() set school(value: School) {
  //   if (value) {
  //     this.formGroup.patchValue(value);
  //   }
  // }
  @Output() profileSubmit: EventEmitter<School> = new EventEmitter<School>();
  constructor(
    private readonly formBuild: FormBuilder,
    private readonly schoolService: SchoolService,
    private readonly router: Router
  ) {
    /*this.schoolService.getSchoolProfile(this.formGroup.value).subscribe({
      next: (response) => {
        this.router.navigate([]);
        console.log('kyss');
      },
      error: (response) => {
        console.log(this.formGroup.get('classes')?.value);
      },
    });
    */
    this.school = {
      name: 'Ivan',
      classes: ['1', '2'],
      subjects: ['Български език', 'Математика'],
    };
    this.subjects = [];

    this.formGroup = this.formBuild.group({
      name: this.formBuild.control('this.school.name'),
      classes: this.formBuild.control(['1', '2', '3']),
      subjects: this.formBuild.array([]),
    });
    this.formGroup.controls['classes'].setValue(['1', '2']);

    this.school.subjects.forEach((s) => this.newSubject(s));
  }

  ngOnInit(): void {}

  handleSubmit() {}

  get subjectsFormArray() {
    return this.formGroup.get('subjects') as FormArray;
  }

  addSubject() {
    this.subjectsFormArray.push(
      this.formBuild.group({
        name: [''],
      })
    );
  }

  newSubject(subject: string): void {
    this.subjectsFormArray.push(
      this.formBuild.group({
        name: [subject],
      })
    );
  }

  removeSubject(index: number) {
    this.subjectsFormArray.removeAt(index);
  }
}
