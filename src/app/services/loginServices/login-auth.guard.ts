import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class LoginAuthService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem("authToken");
    if (token?.length) {
      return this.router.createUrlTree(['/dashboard']);
    } else {
      return true;
    }
  }
}


