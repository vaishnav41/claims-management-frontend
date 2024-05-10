import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  role: string;
  loggedin: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) {

    this.role = sessionStorage.getItem('role');
    this.loggedin = authService.isUserLoggedIn();
  }

  logout() {
    console.log("logout");
    this.authService.logOut();
    this.router.navigate(['']);
  }
}
