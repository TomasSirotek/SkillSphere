import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';
import { SidebarSubmenuComponent } from '../sidebar-submenu/sidebar-submenu.component';
import { NgFor, NgClass, NgTemplateOutlet, NgIf } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {heroBuildingStorefront,heroChevronDoubleRight,heroPhoto,heroFolderOpen} from '@ng-icons/heroicons/outline';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgFor,
        NgClass,
        NgTemplateOutlet,
        NgIf,
        SidebarSubmenuComponent,
        NgIconComponent,
        RouterLinkActive,
        RouterLink
    ],
    viewProviders: [provideIcons({ heroBuildingStorefront,heroChevronDoubleRight,heroPhoto,heroFolderOpen})]
})
export class SidebarMenuComponent implements OnInit {
  constructor(public menuService: MenuService) {}

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  ngOnInit(): void {}
}