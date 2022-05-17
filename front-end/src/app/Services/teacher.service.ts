import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/School';
import { Teacher } from '../models/Teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private readonly http: HttpClient) {}

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`/api/school/grade/teacher`);
  }

  // getSchoolProfile(): Observable<School> {
  //   return this.http.get<School>(`/api/school/name`);
  // }

  editTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`/api/school/grade/teacher`, teacher);
  }
}
