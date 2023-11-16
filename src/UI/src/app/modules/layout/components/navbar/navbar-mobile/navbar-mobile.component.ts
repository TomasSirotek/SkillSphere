import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { NgClass } from '@angular/common';
import { NavbarMobileMenuComponent } from './navbar-mobile-menu/navbar-mobile-menu.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroGlobeAlt,heroXMark } from '@ng-icons/heroicons/outline';

@Component({
    selector: 'app-navbar-mobile',
    templateUrl: './navbar-mobile.component.html',
    styleUrls: ['./navbar-mobile.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        NavbarMobileMenuComponent,
        NgIconComponent,
    ],
    viewProviders: [provideIcons({heroGlobeAlt,heroXMark })]

})
export class NavbarMobileComponent implements OnInit {
  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = false;
  }
}