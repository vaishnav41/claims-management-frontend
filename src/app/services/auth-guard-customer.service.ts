import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardCustomerService implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn() && this.authService.isUserNotManager()) {
      return true;
    } else if (this.authService.isUserLoggedIn && this.authService.isUserManager) {
      alert("Not authorized");
      return false;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}