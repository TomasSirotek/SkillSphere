import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AlertComponent } from 'src/app/shared/component/alert/alert.component';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: true,
    imports: [
        RouterOutlet,
        NavbarComponent,
        SidebarComponent,
        AlertComponent,
        
    ],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
