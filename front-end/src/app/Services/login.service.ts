import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/Login';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  logIn(login: Login): Observable<Login> {
    return this.http.post<Login>(`/api/login`, login);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`/api/get/user`);
  }
}
