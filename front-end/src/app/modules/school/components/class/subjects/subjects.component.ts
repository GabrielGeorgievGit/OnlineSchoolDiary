import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grade } from 'src/app/models/Grade';
import { Subject } from 'src/app/models/Subject';
import { Teacher } from 'src/app/models/Teacher';
import { GradeService } from 'src/app/Services/grade.service';
import { TeacherService } from 'src/app/Services/teacher.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'teacher', 'remove'];
  subjects: Subject[];
  dataSource: Subject[];
  newSubject: string;
  teacher = '';
  teachers: Teacher[];
  grade: Grade = {
    id: 1,
    classNumber: 1,
    grade: 'a',
    schoolName: 'School',
    teacherName: 'Teacher',
  };
  constructor(
    private readonly router: Router,
    private readonly gradeService: GradeService,
    private readonly teacherService: TeacherService
  ) {
    gradeService.getCurrentGrade().subscribe({
      next: (response) => {
        this.grade = { ...response };
        if (this.grade.teacherName === '') {
          this.grade.teacherName = 'None';
        }
      },
    });
    this.subjects = [];

    this.teachers = [];
    this.teacherService.getTeachers().subscribe({
      next: (response) => {
        response.forEach((t) => this.teachers.push(t));
      },
    });

    this.subjects.push({
      name: 'Math',
      teacherName: 'name', //this.teachers[0].fullName,
    });
    this.subjects.push({
      name: 'English',
      teacherName: 'name', //this.teachers[0].fullName,
    });
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
