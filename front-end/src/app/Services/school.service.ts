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
    return this.http.post<School>(`/api/school`, school);
  }

  getSchoolProfile(): Observable<School> {
    return this.http.get<School>(`/api/school`);
  }

  editSchoolProfile(school: School): Observable<School> {
    return this.http.put<School>(`/api/school`, school);
  }
}
