import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { School } from 'src/app/models/School';
import { SchoolService } from 'src/app/Services/school.service';
import { Size } from 'src/app/shared/const/Size';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  schoolAdminId = 2; //sdf
  school: School;
  formGroup: FormGroup;
  types = RegisterComponent.getSchoolTypes();

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
    //this.school = this.schoolService.getSchoolProfile(1).subscribe({});
    this.school = { name: 'School Ivan', type: 'СОУ' };
    this.formGroup = this.formBuild.group({
      name: this.formBuild.control(this.school.name, [
        Validators.required,
        Validators.minLength(Size.SCHOOL_NAME_MIN_LENGTH),
        Validators.maxLength(Size.SCHOOL_NAME_MAX_LENGTH),
      ]),
      types: this.formBuild.control(this.types[0]),
      //subjects: this.formBuild.array([]),
    });
    this.formGroup.controls['types'].setValue(this.school.type);

    //this.school.subjects.forEach((s) => this.newSubject(s));
  }

  ngOnInit(): void {}

  handleSubmit() {}

  // get subjectsFormArray() {
  //   return this.formGroup.get('subjects') as FormArray;
  // }

  // addSubject() {
  //   this.subjectsFormArray.push(
  //     this.formBuild.group({
  //       name: [''],
  //     })
  //   );
  // }

  // newSubject(subject: string): void {
  //   this.subjectsFormArray.push(
  //     this.formBuild.group({
  //       name: [subject],
  //     })
  //   );
  // }

  // removeSubject(index: number) {
  //   this.subjectsFormArray.removeAt(index);
  // }
  editClasses() {
    this.router.navigate(['school-admin/school/classes']);
  }

  editTeachers() {}

  editStudents() {}
}
