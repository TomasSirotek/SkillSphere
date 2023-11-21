import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): any {
    if (!req.url.includes(environment.baseUrl)) {
      return next.handle(req);
    }

    const token = this.authService.getUserToken();

    if (token && this.authService.isSignedIn()) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.authService.signOut();
          this.router.navigate(['/auth/login']);
        }

        return throwError(() => err);
      })
    );
  }
}