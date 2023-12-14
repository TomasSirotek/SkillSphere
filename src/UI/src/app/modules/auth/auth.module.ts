import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { AuthInterceptor } from 'src/app/core/auth/interceptors/auth.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    
  ],
  providers: [
    HttpClientModule,
    HttpClient,
  ]
})
export class AuthModule { }
