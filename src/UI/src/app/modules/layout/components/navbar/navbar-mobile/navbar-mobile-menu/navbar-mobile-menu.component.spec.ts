import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMobileMenuComponent } from './navbar-mobile-menu.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarMobileMenuComponent', () => {
  let component: NavbarMobileMenuComponent;
  let fixture: ComponentFixture<NavbarMobileMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarMobileMenuComponent,RouterTestingModule],
      
    });
    fixture = TestBed.createComponent(NavbarMobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
