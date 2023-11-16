import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Token } from '../Models/Common';
import { RolebaseAuthService } from './rolebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router,private rolebaseAuth : RolebaseAuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        const token = localStorage.getItem("authToken");
        const decodeToken = this.rolebaseAuth.getDecodedAccessToken(token);
        if(decodeToken && decodeToken.role.includes('user')){
          return true;
        }
        else {
          return this.router.createUrlTree(['/auth/login']);
        }
  }
}
