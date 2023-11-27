import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePriceComponent } from './course-price.component';

describe('CoursePriceComponent', () => {
  let component: CoursePriceComponent;
  let fixture: ComponentFixture<CoursePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursePriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
