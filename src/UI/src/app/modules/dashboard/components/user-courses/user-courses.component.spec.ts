import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoursesComponent } from './user-courses.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('UserCoursesComponent', () => {
  let component: UserCoursesComponent;
  let fixture: ComponentFixture<UserCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCoursesComponent,RouterTestingModule,HttpClientTestingModule, ToastrModule.forRoot()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
