import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardServiceService } from './service/dashboard-service.service';


@NgModule({
  imports: [DashboardRoutingModule,HttpClientModule],
  providers: [
    HttpClient,
    DashboardServiceService
  ]
})
export class DashboardModule {}