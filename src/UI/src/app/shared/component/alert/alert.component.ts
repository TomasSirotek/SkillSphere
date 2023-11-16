import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertServiceService } from '../../service/alert-service.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  
})
export class AlertComponent {
 

  constructor() {}

  showNotification() {
   
  }

  
}
