import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.school = { name: 'School', type: 'СОУ' };
    this.schoolService.getSchoolProfile().subscribe({
      next: (response) => {
        this.school = response;
      },
      error: (response) => {
        console.log(response);
      },
    });
    console.log(this.school);

    this.formGroup = this.formBuild.group({
      name: this.formBuild.control(this.school.name, [
        Validators.required,
        Validators.minLength(Size.SCHOOL_NAME_MIN_LENGTH),
        Validators.maxLength(Size.SCHOOL_NAME_MAX_LENGTH),
      ]),
      types: this.formBuild.control(this.school.type),
    });
    this.formGroup.controls['types'].setValue(this.school.type);
  }

  ngOnInit(): void {}

  handleSubmit() {
    this.school = {
      name: this.formGroup.get('name')?.value,
      type: this.formGroup.get('types')?.value,
    };
    console.log(this.school);
    this.schoolService.editSchoolProfile(this.school).subscribe({
      next: (response) => {
        alert('Successful change');
      },
      error: (response) => {
        alert('Unsuccessful change');
      },
    });
  }

  editClasses() {
    this.router.navigate(['school-admin/school/classes']);
  }

  editTeachers() {}

  editStudents() {}
}
