import {Injectable, OnDestroy, inject} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { shareReplay } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import { AuthResponse } from '../models/login';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  public signInState: Observable<AuthResponse>;
  private _signInState = new BehaviorSubject<AuthResponse>(null);


  constructor(private _http: HttpClient) {
    this.signInState = this._signInState.asObservable();
    const userData = this.getStoredUserData();

    if (userData != null) {
      this._signInState.next(userData);
    }

  }

  public authenticate(email: string, password: string): Observable<HttpResponse<AuthResponse>> {
    const loginData = {
      email: email,
      password: password
    };
    return this._http.post<AuthResponse>(`${environment.baseUrl}/auth/authenticate`, loginData, { observe: 'response' })
      .pipe(
        tap(res => this.signIn(res.body)),
        shareReplay()
      );
  }

  public register(email: string, password: string): Observable<any> {
    const registrationData = {
      email: email,
      password: password
    };
    return this._http.post<Register>(`${environment.baseUrl}/auth/register`, registrationData);
  
  }


  private signIn(data: AuthResponse) {
    const expiresAt = new Date();
    expiresAt.setTime(Date.now() + (data.expiresIn * 1000));

    localStorage.setItem('auth_userData', JSON.stringify(data));
    localStorage.setItem('auth_jwt', `${data.token}`);
    localStorage.setItem('auth_tokenExpiresAt', expiresAt.getTime().toString());

    this._signInState.next(data);
  }

  public signOut() {
    localStorage.removeItem('auth_jwt');
    localStorage.removeItem('auth_userData');
    localStorage.removeItem('auth_tokenExpiresAt');

    this._signInState.next(null);
  }

  public isSignedIn() {
    return this._signInState.value != null;
  }

  public getUserToken() {
    return localStorage.getItem('auth_jwt');
  }

  public isTokenValid(): boolean {
    const expiresAt = +localStorage.getItem('auth_tokenExpiresAt');
    const currentTime = Date.now();
    return expiresAt > currentTime;
  
  }

  private getStoredUserData(): AuthResponse {
    return JSON.parse(localStorage.getItem('auth_userData')) as AuthResponse;
  }
}
