import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('/User/') || request.url.includes('/File/') || request.url.includes('/ProcessCSVData/')) {
      // Retrieve the JWT token from localStorage or wherever you store it.
      const token = localStorage.getItem('authToken'); // Adjust this based on your implementation
      let access_token = "";
      if (token) {
        access_token = JSON.parse(token!)?.access_token;
      }

      // Clone the request and add the Authorization header.
      if (access_token) {
        request = request.clone({
          setHeaders: {
            Authorization: ` bearer ${access_token}`,
          },
        });
      }
    } else if (request.url.includes('/ImportData/')) {
      request = request.clone({
        setHeaders: {
          "Import-Data-Token": environment.importDataToken,
        },
      });
    }

    // Pass the modified request to the next handler.
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Check for 401 status code in the response
            if (event.status == 401) {
              // Redirect to the login route
              localStorage.removeItem('authToken');
              this.router.navigate(['/login']);
            }
          }
        },
        (error) => {
          // Handle errors, e.g., check for 401 status code and redirect
          if (error.status == 401) {
            localStorage.removeItem('authToken');
            this.router.navigate(['/login']);
          }
        }
      )
    );

  }
}
