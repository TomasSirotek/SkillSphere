import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCardComponent } from './courses-card.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CoursesCardComponent', () => {
  let component: CoursesCardComponent;
  let fixture: ComponentFixture<CoursesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoursesCardComponent,HttpClientModule,RouterTestingModule]
    });
    fixture = TestBed.createComponent(CoursesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
