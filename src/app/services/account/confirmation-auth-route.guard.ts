import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const confirmationAuthRouteGuard: CanActivateFn = (route: any, state: any) => {
  const keyToCheck = "token";
  const baseUrl = "/login"
  const router: any = inject(Router);
  if (route.queryParams && route.queryParams != undefined) {
    if (route.queryParams.hasOwnProperty(keyToCheck)) {
      if (route.queryParams.token.length > 0 && route.queryParams.token !== '') {
        return true;
      }
      else {
        // router.navigated = ['/login'];
        window.location.href = baseUrl;
        return false;
      }
    }
    else {
      // router.navigated = ['/login'];
      window.location.href = baseUrl;
      return false;
    }
  }
  else {
    //  router.navigated = ['/login'];
    window.location.href = baseUrl;
    return false;
  }
};
