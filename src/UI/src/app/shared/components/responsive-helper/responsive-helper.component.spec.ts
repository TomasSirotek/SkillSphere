import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveHelperComponent } from './responsive-helper.component';

describe('ResponsiveHelperComponent', () => {
  let component: ResponsiveHelperComponent;
  let fixture: ComponentFixture<ResponsiveHelperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResponsiveHelperComponent]
    });
    fixture = TestBed.createComponent(ResponsiveHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
