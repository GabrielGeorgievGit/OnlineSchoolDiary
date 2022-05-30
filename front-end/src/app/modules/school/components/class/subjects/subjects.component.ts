import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grade } from 'src/app/models/Grade';
import { Subject } from 'src/app/models/Subject';
import { SubjectTeacherPair } from 'src/app/models/SubjectTeacherPair';
import { SubjectTeacherTable } from 'src/app/models/SubjectTeacherTable';
import { Teacher } from 'src/app/models/Teacher';
import { GradeService } from 'src/app/Services/grade.service';
import { SchoolService } from 'src/app/Services/school.service';
import { TeacherService } from 'src/app/Services/teacher.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'teacher', 'remove'];
  subjects: Subject[];
  dataSource: SubjectTeacherPair[];
  newSubject: string;
  teacher = '';
  subject = '';
  teachers: Teacher[];
  subjectTeachers: SubjectTeacherPair[] = [];
  grade: Grade = {
    id: 1,
    classNumber: 1,
    grade: 'a',
    schoolName: 'School',
    teacherName: 'Teacher',
  };
  constructor(
    private readonly router: Router,
    private readonly schoolService: SchoolService,
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

    this.dataSource = [];

    this.newSubject = '';
  }

  isInTable(str: string): boolean {
    for (let i = 0; i < this.dataSource.length; ++i) {
      if (this.dataSource[i].subject === str) return true;
    }

    return false;
  }

  ngOnInit(): void {
    this.gradeService.getSubjectTeachers().subscribe({
      next: (response) => {
        console.log('response: ', response);
        this.dataSource = response;
        response.forEach((st) => this.subjectTeachers.push(st));

        this.schoolService.getSubjects().subscribe({
          next: (response) => {
            response.forEach((s) => {
              if (!this.isInTable(s.name)) this.subjects.push(s);
            });
          },
        });
      },
    });

    this.teacherService.getTeachers().subscribe({
      next: (response) => {
        response.forEach((t) => this.teachers.push(t));
      },
    });

    //this.dataSource = this.subjectTeachers;
  }

  removeSubject(index: number) {
    console.log(this.dataSource[index]);
    this.gradeService
      .deleteSubjectTeacher({
        idGrade: this.dataSource[index].gst.idGrade,
        idSubject: this.dataSource[index].gst.idSubject,
        idTeacher: this.dataSource[index].gst.idTeacher,
      })
      .subscribe({
        next: (response) => {
          alert('Successfully deleted');
          window.location.reload();
        },
      });
  }

  addSubject(idSubject: number, idTeacher: number) {
    this.gradeService
      .addSchoolGradeSubjectTeacher({
        idGrade: this.grade.id,
        idSubject: idSubject,
        idTeacher: idTeacher,
      })
      .subscribe({
        next: (response) => {
          alert('Successfully added');
          window.location.reload();
        },
        error: (response) => {
          console.log(response);
        },
      });
  }

  editClass() {
    this.router.navigate(['school-admin/school/grade']);
  }
}
