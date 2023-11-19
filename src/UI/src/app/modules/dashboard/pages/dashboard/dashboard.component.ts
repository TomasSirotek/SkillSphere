import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, Type, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardServiceService } from '../../service/dashboard-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,DashboardHeaderComponent,HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
 // test = inject(DashboardServiceService)
  
  constructor() { }

  ngOnInit(): void {
   
  }

  // ngOnInit(): void {
  //   this.ds.getDashboardData().subscribe(data => {
  //     console.log(data);
  //   });
  // }  
  
}
