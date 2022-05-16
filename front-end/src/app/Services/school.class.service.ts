import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SchoolClass } from '../models/SchoolClass';

@Injectable({
  providedIn: 'root',
})
export class SchoolClassService {
  constructor(private readonly http: HttpClient) {}

  // registerSchoolProfile(school: School): Observable<School> {
  //   return this.http.post<School>(`/api/school`, school);
  // }

  getSchoolClasses(): Observable<SchoolClass[]> {
    return this.http.get<SchoolClass[]>(`/api/school/classes`);
  }

  // editSchoolProfile(school: School): Observable<School> {
  //   return this.http.put<School>(`/api/school`, school);
  // }
}
