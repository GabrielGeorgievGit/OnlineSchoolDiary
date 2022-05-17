import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/School';
import { Teacher } from '../models/Teacher';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private readonly http: HttpClient) {}

  registerSchoolProfile(school: School): Observable<School> {
    return this.http.post<School>(`/api/school`, school);
  }

  getSchoolProfile(): Observable<School> {
    return this.http.get<School>(`/api/school`);
  }

  editSchoolProfile(school: School): Observable<School> {
    return this.http.put<School>(`/api/school`, school);
  }

  registerTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`/api/school/teacher`, teacher);
  }
}
