import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const params = {
      email,
      password,
    };
    return this.http.post(`${environment.api}/api/v1/users/login`, params);
  }

  signup(params: {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
  }): Observable<any> {
    return this.http.post(`${environment.api}/api/v1/users/signup`, params);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api}/api/v1/users/`);
  }
}
