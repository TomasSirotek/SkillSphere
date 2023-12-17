import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDetailComponent } from './courses-detail-component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';

describe('CoursesDetailComponent', () => {
  let component: CoursesDetailComponent;
  let fixture: ComponentFixture<CoursesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoursesDetailComponent,RouterTestingModule,HttpClientModule,ToastrModule.forRoot()],
    });
    fixture = TestBed.createComponent(CoursesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

});
