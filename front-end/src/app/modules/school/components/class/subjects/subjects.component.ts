import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'src/app/models/Subject';
import { Teacher } from 'src/app/models/Teacher';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {
  idGrade: number;
  displayedColumns: string[] = ['name', 'teacher', 'remove'];
  subjects: Subject[];
  dataSource: Subject[];
  newSubject: string;
  teacher = '';
  teachers: string[];

  constructor(private readonly router: Router) {
    this.idGrade = 1;
    this.subjects = [];

    this.teachers = [];
    this.teachers.push('Ivan Ivanov');

    this.subjects.push({ name: 'Math', teacherName: this.teachers[0] });
    this.subjects.push({ name: 'English', teacherName: this.teachers[0] });
    this.dataSource = this.subjects;

    this.newSubject = '';
  }

  ngOnInit(): void {}

  removeSubject(subject: Subject, index: number) {
    console.log(this.subjects[index]);

    //this.router.navigate(['school-admin/school/classes']);
  }

  addSubject(subject: string, teacher: string) {
    console.log(this.dataSource);
    this.subjects.push({ name: subject, teacherName: teacher });
    window.location.reload();
  }

  editClass() {
    this.router.navigate(['school-admin/school/grade']);
  }
}
