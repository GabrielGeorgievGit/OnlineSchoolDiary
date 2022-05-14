import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/Student';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.css'],
})
export class EditGradeComponent implements OnInit {
  idGrade: number;
  displayedColumns: string[] = ['fullName'];
  students: Student[];
  dataSource: Student[];
  newStudent: string;

  constructor(private readonly router: Router) {
    this.idGrade = 1;
    this.students = [];
    this.students.push({
      fullName: 'Ivan Hristov Blagoev',
      idGrade: this.idGrade,
    });

    this.dataSource = this.students;

    this.newStudent = '';
  }

  ngOnInit(): void {}

  editStudent(student: string) {
    console.log(student);
    this.router.navigate(['school-admin/school/classes']);
  }

  addStudent(student: string) {
    console.log(this.dataSource);
    this.students.push({ fullName: student, idGrade: this.idGrade });
    window.location.reload();
  }

  editSubjects() {
    this.router.navigate(['school-admin/school/grade/subjects']);
  }
}
