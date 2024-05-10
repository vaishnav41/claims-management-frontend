import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  role = ''

  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.role = sessionStorage.getItem('role');
  }

  checkLogin() {
    this.authenticationService.authenticate(this.username, this.password).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.role = sessionStorage.getItem('role');
        this.router.navigate(['home'])
      } else {
        this.invalidLogin = true;
        this.username = '';
        this.password = '';
        window.alert('Invalid username or password. Please try again')
      }
    });
  }
}
