import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { AlertComponent } from './shared/component/alert/alert.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgClass, RouterOutlet, ResponsiveHelperComponent,AlertComponent],
  
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(public themeService: ThemeService) {}
  ngOnInit(): void {
    initFlowbite();
  }
}
