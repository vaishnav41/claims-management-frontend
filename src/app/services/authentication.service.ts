import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticateURL: string = "http://localhost:9090/authenticate/users";
  user: User;
  authenticated: boolean;
  users: User[];
  userBackend: User;


  constructor(private http: HttpClient) {

  }


  authenticate(username, password): Observable<boolean> {
    this.user = new User();
    this.user.userName = username;
    this.user.password = password;

    return new Observable<boolean>((observer) => {
      this.getUser(this.user).pipe(first()).subscribe((data) => {
        this.userBackend = new User();
        this.userBackend.userName = data.userName;
        this.userBackend.password = data.password;
        this.userBackend.role = data.role;
        if (this.user.userName === this.userBackend.userName && this.user.password == this.userBackend.password) {
          this.authenticated = true;
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('role', this.userBackend.role);
        } else {
          this.authenticated = false;
        }
        observer.next(this.authenticated);
        observer.complete();
      });
    });
  }


  getUser(user: any) {
    return this.http.post<User>(this.authenticateURL, user);
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    let role = sessionStorage.getItem('role');
    return !(user === null && role === null);
  }

  isUserManager() {
    let role = sessionStorage.getItem('role');
    return (role === 'manager');
  }

  isUserNotManager() {
    let role = sessionStorage.getItem('role');
    return (role === 'customer');
  }

  logOut() {
    sessionStorage.clear();
  }
}