import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import packageJson from '../../../../../../package.json';
import { MenuService } from '../../services/menu.service';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { NgClass, NgIf } from '@angular/common';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroGlobeAlt,heroInboxStack,heroChevronDoubleLeft,heroSun,heroMoon,heroArrowLeftOnRectangle, heroBuildingStorefront, heroArrowDownTray } from '@ng-icons/heroicons/outline';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { CmdkModule, CmdkService } from '@ngneat/cmdk';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        SidebarMenuComponent,
        NgIconComponent,
        RouterLinkActive,
        CmdkModule,
  
    ],
    viewProviders: [provideIcons({heroGlobeAlt,heroBuildingStorefront, heroArrowLeftOnRectangle, heroInboxStack,heroChevronDoubleLeft,heroSun, heroMoon,heroArrowDownTray})]
})
export class SidebarComponent implements OnInit {
  public appJson: any = packageJson;

  constructor(public themeService: ThemeService, public menuService: MenuService) {
  }

  ngOnInit(): void {}

  

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  toggleTheme() {
    this.themeService.theme = !this.themeService.isDark ? 'dark' : 'light';
  }



 
}