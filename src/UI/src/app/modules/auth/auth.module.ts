import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/core/auth/service/auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
  ],
  providers: [
    HttpClientModule,
    AuthService,
    HttpClient
  ]
})
export class AuthModule { }
