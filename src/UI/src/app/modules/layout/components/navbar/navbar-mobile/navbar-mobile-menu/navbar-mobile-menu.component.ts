import { Component, OnInit } from '@angular/core';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from 'src/app/modules/layout/services/menu.service';
import { NavbarMobileSubmenuComponent } from '../navbar-mobile-submenu/navbar-mobile-submenu.component';
import {heroBuildingStorefront,heroChevronDoubleLeft,heroPhoto,heroFolderOpen} from '@ng-icons/heroicons/outline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { NgFor, NgClass, NgTemplateOutlet, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-navbar-mobile-menu',
    templateUrl: './navbar-mobile-menu.component.html',
    styleUrls: ['./navbar-mobile-menu.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        NgClass,
        NgTemplateOutlet,
        NgIf,
        NgIconComponent,
        NavbarMobileSubmenuComponent,
    ],
    viewProviders: [provideIcons({heroChevronDoubleLeft,heroBuildingStorefront,heroFolderOpen})]

})
export class NavbarMobileMenuComponent implements OnInit {
  constructor(public menuService: MenuService) {}

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  public closeMenu() {
    this.menuService.showMobileMenu = false;
  }

  ngOnInit(): void {}
}