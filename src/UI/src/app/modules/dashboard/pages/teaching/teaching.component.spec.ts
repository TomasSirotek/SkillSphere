import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingComponent } from './teaching.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Toast, ToastrModule } from 'ngx-toastr';

describe('TeachingComponent', () => {
  let component: TeachingComponent;
  let fixture: ComponentFixture<TeachingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeachingComponent,RouterTestingModule,HttpClientTestingModule, ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(TeachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
