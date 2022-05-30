import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Clazz } from '../models/Clazz';
import { Grade } from '../models/Grade';
import { Student } from '../models/Student';
import { SubjectTeacher } from '../models/SubjectTeacher';
import { SubjectTeacherPair } from '../models/SubjectTeacherPair';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  constructor(private readonly http: HttpClient) {}

  // registerSchoolProfile(school: School): Observable<School> {
  //   return this.http.post<School>(`/api/school`, school);
  // }

  getSchoolGrade(clazz: Clazz): Observable<Grade> {
    return this.http.post<Grade>(`/api/school/grade`, clazz);
  }

  getCurrentGrade(): Observable<Grade> {
    return this.http.get<Grade>(`/api/school/grade`);
  }

  getSchoolStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`/api/school/grade/students`);
  }

  addSchoolGradeSubjectTeacher(st: SubjectTeacher): Observable<SubjectTeacher> {
    return this.http.post<SubjectTeacher>(
      `/api/school/grade/subject-teacher`,
      st
    );
  }

  getSubjectTeachers(): Observable<SubjectTeacherPair[]> {
    return this.http.get<SubjectTeacherPair[]>(
      `/api/school/grade/subject-teachers`
    );
  }

  deleteSubjectTeacher(st: SubjectTeacher) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        idGrade: st.idGrade,
        idSubject: st.idSubject,
        idTeacher: st.idTeacher,
      },
    };
    return this.http.delete<SubjectTeacher>(
      `/api/school/grade/subject-teachers/delete`,
      options
    );
  }

  // editSchoolProfile(school: School): Observable<School> {
  //   return this.http.put<School>(`/api/school`, school);
  // }
}
