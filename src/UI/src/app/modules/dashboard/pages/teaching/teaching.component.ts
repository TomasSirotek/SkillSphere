import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { BoxesHeaderComponent } from 'src/app/modules/management/components/boxes/boxes-header/boxes-header.component';

@Component({
  selector: 'app-teaching',
  standalone: true,
  imports: [CommonModule,BoxesHeaderComponent],
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.scss']
})
export class TeachingComponent implements OnInit {
  
  
  ngOnInit(): void {
    
  }

}
