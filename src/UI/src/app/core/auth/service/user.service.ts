import {Injectable, OnDestroy, inject} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { shareReplay } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import {BehaviorSubject, Observable, Observer} from 'rxjs';
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
  
    constructor(private _http: HttpClient, private authService: AuthService) {
        this.wishList = this._wishListState.asObservable();

        const userId = this.authService.getUserId();
    
        if (userId) {
            this.loadWishList(userId);
        } else {
           
            this._wishListState.next([]);
        }
       
      
    }
  
    private async loadWishList(userId: string) {
        try {
            const response = await this._http.get<{ courses: Course[] }>(`${environment.baseUrl}/courses/${userId}/wishlist`, { observe: 'response' }).toPromise();
    
            if (response.ok) {
                const wishlist = response.body.courses;
                this._wishListState.next(wishlist);
            } else {
                this._wishListState.next([]);
            }
        } catch (error) {
            console.error('HTTP request error:', error);
            this._wishListState.next([]); 
        }
    }

    
  }