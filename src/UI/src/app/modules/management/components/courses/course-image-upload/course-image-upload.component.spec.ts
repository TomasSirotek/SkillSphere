import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseImageUploadComponent } from './course-image-upload.component';

describe('CourseImageUploadComponent', () => {
  let component: CourseImageUploadComponent;
  let fixture: ComponentFixture<CourseImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseImageUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
