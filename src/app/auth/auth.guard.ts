import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Token } from '../Models/Common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {


    // Check if the user is authenticated (e.g., based on a token)
    if (this.authService.IsAuthrized()) {
      return true; // User is allowed to access the route
    } else {
      // User is not authenticated, redirect to the login page
      return this.router.createUrlTree(['/login']);
    }
  }
}
