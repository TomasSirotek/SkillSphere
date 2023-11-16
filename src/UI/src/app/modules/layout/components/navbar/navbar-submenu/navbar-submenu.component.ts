import { Component, Input, OnInit } from '@angular/core';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor, NgTemplateOutlet, NgIf } from '@angular/common';

@Component({
    selector: 'div[navbar-submenu]',
    templateUrl: './navbar-submenu.component.html',
    styleUrls: ['./navbar-submenu.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        NgTemplateOutlet,
    
        NgIf
    ],
})
export class NavbarSubmenuComponent implements OnInit {
  @Input() public submenu = <SubMenuItem[]>{};

  constructor() {}

  ngOnInit(): void {}
}
