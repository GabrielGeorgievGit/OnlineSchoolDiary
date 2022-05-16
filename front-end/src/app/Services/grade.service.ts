import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clazz } from '../models/Clazz';
import { Grade } from '../models/Grade';
import { Student } from '../models/Student';

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

  getSchoolStudents(): Observable<string[]> {
    return this.http.get<string[]>(`/api/school/grade/students`);
  }

  // editSchoolProfile(school: School): Observable<School> {
  //   return this.http.put<School>(`/api/school`, school);
  // }
}
