import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../query/global.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.getValue();
  }
}
