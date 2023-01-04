import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _userSource = new Subject<User>();
  userSource$ = this._userSource.asObservable();
  constructor() {}

  set setUser(val: User) {
    this._userSource.next(val);
  }

  get getUser(): Observable<User> {
    return this.userSource$;
  }
}
