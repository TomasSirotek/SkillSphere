import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoriesComponent } from './course-categories.component';

describe('CourseCategoriesComponent', () => {
  let component: CourseCategoriesComponent;
  let fixture: ComponentFixture<CourseCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
