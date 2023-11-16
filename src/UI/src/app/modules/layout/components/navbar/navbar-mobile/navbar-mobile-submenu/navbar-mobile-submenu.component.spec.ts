import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMobileSubmenuComponent } from './navbar-mobile-submenu.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarMobileSubmenuComponent', () => {
  let component: NavbarMobileSubmenuComponent;
  let fixture: ComponentFixture<NavbarMobileSubmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarMobileSubmenuComponent,RouterTestingModule]
    });
    fixture = TestBed.createComponent(NavbarMobileSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
