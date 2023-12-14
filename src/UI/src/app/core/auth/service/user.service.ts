import {Injectable, OnDestroy, inject} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import {BehaviorSubject, Observable, Observer, forkJoin, of} from 'rxjs';
import { AuthResponse } from '../models/login';
import { Register } from '../models/register';
import { Course } from 'src/app/modules/management/models/course';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})



export class UserService {

    
    constructor(private _http: HttpClient, private authService: AuthService) {



    }


    public loadWishList(userId: string): Observable<Course[]> {
      return this._http.get<{ courses: Course[] }>(`${environment.baseUrl}/courses/${userId}/wishlist`)
          .pipe(
              map(response => response.courses),
              catchError(error => {
                  console.error('HTTP request error:', error);
                  return of([]); // Return an empty array in case of an error
              })
          );
  }
  
    
   
  
    
  }
  
