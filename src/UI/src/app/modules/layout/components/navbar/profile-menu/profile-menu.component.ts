import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import {  RouterLink } from '@angular/router';


@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule,NgClass,RouterLink],
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})

export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;

  constructor() {}

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}