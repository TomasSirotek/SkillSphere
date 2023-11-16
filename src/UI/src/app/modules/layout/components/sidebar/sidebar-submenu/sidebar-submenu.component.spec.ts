import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSubmenuComponent } from './sidebar-submenu.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidebarSubmenuComponent', () => {
  let component: SidebarSubmenuComponent;
  let fixture: ComponentFixture<SidebarSubmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidebarSubmenuComponent,RouterTestingModule]
    });
    fixture = TestBed.createComponent(SidebarSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
