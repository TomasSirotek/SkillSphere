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
    public wishList: Observable<Course[]>;
    private _wishListState = new BehaviorSubject<Course[]>([]);
  
    public ownedCourses: Observable<Course[]>;
    private _ownedCoursesState = new BehaviorSubject<Course[]>([]);
  
    constructor(private _http: HttpClient, private authService: AuthService) {
      this.wishList = this._wishListState.asObservable();
      this.ownedCourses = this._ownedCoursesState.asObservable();
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
    
      public loadOwnedCourses(userId: string): Observable<Course[]> {
        return this._http.get<{ courses: Course[] }>(`${environment.baseUrl}/courses/${userId}/owned`)
          .pipe(
            map(response => response.courses),
            catchError(error => {
              console.error('HTTP request error:', error);
              return of([]); // Return an empty array in case of an error
            })
          );
      }
    
      public loadData(): Observable<void> {
        const userId = this.authService.getUserId();
    
        if (!userId) {
          this._wishListState.next([]);
          this._ownedCoursesState.next([]);
          return of(undefined);
        }
    
        return forkJoin([
          this.loadWishList(userId),
          this.loadOwnedCourses(userId),
        ]).pipe(
          switchMap(([wishList, ownedCourses]) => {
            this._wishListState.next(wishList);
            this._ownedCoursesState.next(ownedCourses);
            return of(undefined);
          })
        );
      }
  }
  
