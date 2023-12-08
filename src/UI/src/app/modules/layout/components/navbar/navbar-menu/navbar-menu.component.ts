import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';
import { NavbarSubmenuComponent } from '../navbar-submenu/navbar-submenu.component';
import { NgFor, NgClass, NgIf, NgStyle } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { AlertComponent } from 'src/app/shared/component/alert/alert.component';
import { CmdkModule, CommandComponent, EmptyDirective, GroupComponent, InputDirective, ItemDirective, ListComponent } from '@ngneat/cmdk';
import { CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { DynamicViewModule } from '@ngneat/overview';
import { SearchService } from '../../../services/search.service';

@Component({
    selector: 'app-navbar-menu',
    templateUrl: './navbar-menu.component.html',
    styleUrls: ['./navbar-menu.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        NgClass,
        NavbarSubmenuComponent,
        RouterOutlet,
        
        SidebarComponent,
        AlertComponent,
        CmdkModule,
        NgIf,
        OverlayModule,
        CommandComponent,
        InputDirective,
        ListComponent,
        GroupComponent,
        NgFor,
        DynamicViewModule,
        ItemDirective,
        EmptyDirective,
        CdkConnectedOverlay,
        NgStyle,
        FormsModule,
        NgClass
    ],
})
export class NavbarMenuComponent implements OnInit {


  private showMenuClass = ['scale-100', 'animate-fade-in-up', 'opacity-100', 'pointer-events-auto'];
  private hideMenuClass = ['scale-95', 'animate-fade-out-down', 'opacity-0', 'pointer-events-none'];
  
  
  isDialogOpen: boolean = true;

  constructor(public menuService: MenuService, public searchService: SearchService) {}

  ngOnInit(): void {}

  public toggleMenu(menu: MenuItem): void {
  }

  

  
}