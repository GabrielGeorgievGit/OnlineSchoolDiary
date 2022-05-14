import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/School';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private readonly http: HttpClient) {}

  registerSchoolProfile(school: School): Observable<School> {
    return this.http.post<School>(`http://localhost:4200/#/login`, school);
  }

  getSchoolProfile(schoolName: string): Observable<School> {
    return this.http.get<School>(
      `http://localhost:4200/#/school-admin/school/${schoolName}`
    );
  }

  editSchoolProfile(school: School): Observable<School> {
    return this.http.put<School>(
      `http://localhost:4200/#/school-admin/school/view/${school.name}`,
      school
    );
  }
}
