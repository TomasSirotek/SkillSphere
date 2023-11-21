import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { Subscription } from 'rxjs';
import { AuthResponse } from 'src/app/core/auth/models/login';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink],
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;
  private signInStateSubscription: Subscription;
  public authResponse: AuthResponse;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.signInStateSubscription = this.authService.signInState.subscribe(
      (authResponse: AuthResponse) => {
        this.authResponse = authResponse;
      }
    );
  }

  ngOnDestroy() {
    if (this.signInStateSubscription) {
      this.signInStateSubscription.unsubscribe();
    }
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public logout(): void {
    this.authService.signOut();
  }
}
