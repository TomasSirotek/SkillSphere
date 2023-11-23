import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingComponent } from './teaching.component';

describe('TeachingComponent', () => {
  let component: TeachingComponent;
  let fixture: ComponentFixture<TeachingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeachingComponent]
    });
    fixture = TestBed.createComponent(TeachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
