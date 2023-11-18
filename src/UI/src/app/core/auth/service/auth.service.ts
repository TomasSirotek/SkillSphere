import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { shareReplay } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import { AuthOk } from '../models/login';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  
  public signInState: Observable<AuthOk>;
  private _signInState = new BehaviorSubject<AuthOk>(null);

  constructor(private _http: HttpClient) {

    this.signInState = this._signInState.asObservable();

    const userData = this.getStoredUserData();
    if (userData != null) {
      this._signInState.next(userData);
    }
  }

  public authenticate(email: string, password: string): Observable<HttpResponse<AuthOk>> {
    const loginData = {
      email: email,
      password: password
    };

    return this._http.post<AuthOk>(`${environment.baseUrl}/Users/login`, loginData, { observe: 'response' })
      .pipe(
        tap(res => this.signIn(res.body)),
        shareReplay()
      );
  }


  private signIn(data: AuthOk) {
    console.log(data)
    const expiresAt = new Date();
    expiresAt.setTime(Date.now() + (data.expiresIn * 1000));

    localStorage.setItem('auth_userData', JSON.stringify(data));
    localStorage.setItem('auth_tokenString', `${data.tokenType} ${data.accessToken}`);
    localStorage.setItem('auth_tokenExpiresAt', expiresAt.getTime().toString());
    this._signInState.next(data);
  }

  public signOut() {
    localStorage.removeItem('auth_userData');
    localStorage.removeItem('auth_tokenString');
    localStorage.removeItem('auth_tokenExpiresAt');

    this._signInState.next(null);
  }

  public isSignedIn() {
    return this._signInState.value != null;
  }

  public getUserToken() {
    return localStorage.getItem('auth_tokenString');
  }

  public getValidityDays() {
    return (+localStorage.getItem('auth_tokenExpiresAt') - Date.now()) / 1000 / (3600 * 24);
  }

  private getStoredUserData(): AuthOk {
    return JSON.parse(localStorage.getItem('auth_userData')) as AuthOk;
  }
}
