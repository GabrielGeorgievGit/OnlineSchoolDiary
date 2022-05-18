import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private readonly http: HttpClient) {}

  registerStudentProfile(student: Student): Observable<Student> {
    return this.http.post<Student>(`/api/school/grade/student`, student);
  }

  // getSchoolProfile(): Observable<Student> {
  //   return this.http.get<Student>(`/api/school`);
  // }

  // editSchoolProfile(student: Student): Observable<Student> {
  //   return this.http.put<Student>(`/api/school`, student);
  // }
}
