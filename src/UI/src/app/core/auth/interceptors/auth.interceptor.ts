import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';



@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  refresh = false;
  constructor() {}

  

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (!req.url.includes(environment.baseUrl))
    return next.handle(req);
    
    const token = this.authService.getUserToken();

    if (!token)
      return next.handle(req);

    if(this.authService.isSignedIn){
      req =  req.clone({
        headers: req.headers.set('Authorization', token)
      });
    }

    return next.handle(req);
    // return next.handle(cloned).pipe(catchError((err: HttpErrorResponse) => {
    //   if (err.status === 401 && !this.refresh) {
    //     this.refresh = true;

    //     return this.http.post('http://localhost:5001/api/Users/refresh', {}, {withCredentials: true}).pipe(
    //       switchMap((res: any) => {
    //         this.authService.setUserToken(res.accessToken);

    //         return next.handle(cloned.clone({
    //           setHeaders: {
    //             Authorization: `Authorization ${token}`
    //           }
    //         }));
    //       })
    //     );
    //   }
    //   this.refresh = false;
    //   return throwError(() => err);
    // }));
}
}
