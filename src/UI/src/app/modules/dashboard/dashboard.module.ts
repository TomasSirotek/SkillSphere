import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardServiceService } from './service/dashboard-service.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';

@NgModule({
  imports: [DashboardRoutingModule, HttpClientModule],
  providers: [
    HttpClient,
    DashboardServiceService,
    AuthService,
    HttpClientModule
  ],
})
export class DashboardModule {}
