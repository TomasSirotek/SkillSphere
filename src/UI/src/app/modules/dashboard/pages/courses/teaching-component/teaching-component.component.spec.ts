import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingComponentComponent } from './teaching-component.component';

describe('TeachingComponentComponent', () => {
  let component: TeachingComponentComponent;
  let fixture: ComponentFixture<TeachingComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeachingComponentComponent]
    });
    fixture = TestBed.createComponent(TeachingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
