import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChaptersComponent } from './course-chapters.component';

describe('CourseChaptersComponent', () => {
  let component: CourseChaptersComponent;
  let fixture: ComponentFixture<CourseChaptersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseChaptersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
