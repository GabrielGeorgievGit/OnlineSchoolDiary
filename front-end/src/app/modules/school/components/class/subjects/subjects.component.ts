import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'src/app/models/Subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {
  idGrade: number;
  displayedColumns: string[] = ['name', 'remove'];
  subjects: Subject[];
  dataSource: Subject[];
  newSubject: string;

  constructor(private readonly router: Router) {
    this.idGrade = 1;
    this.subjects = [];
    this.subjects.push({ name: 'Math' });

    this.dataSource = this.subjects;

    this.newSubject = '';
  }

  ngOnInit(): void {}

  removeSubject(subject: string) {
    console.log(subject);
    //this.router.navigate(['school-admin/school/classes']);
  }

  addSubject(subject: string) {
    console.log(this.dataSource);
    this.subjects.push({ name: subject });
    window.location.reload();
  }

  editClass() {
    this.router.navigate(['school-admin/school/grade']);
  }
}
