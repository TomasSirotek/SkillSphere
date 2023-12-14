import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardServiceService } from './service/dashboard-service.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { AuthInterceptor } from 'src/app/core/auth/interceptors/auth.interceptor';
import { CourseService } from '../management/services/course-service.service';
import { UserService } from 'src/app/core/auth/service/user.service';

@NgModule({
  imports: [DashboardRoutingModule, HttpClientModule],
  providers: [
    HttpClient,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
    },
    DashboardServiceService,
    AuthService,
    CourseService,
    UserService
  ],
})
export class DashboardModule {}
