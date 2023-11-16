import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMobileComponent } from './navbar-mobile.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarMobileComponent', () => {
  let component: NavbarMobileComponent;
  let fixture: ComponentFixture<NavbarMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarMobileComponent,RouterTestingModule]
    });
    fixture = TestBed.createComponent(NavbarMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
