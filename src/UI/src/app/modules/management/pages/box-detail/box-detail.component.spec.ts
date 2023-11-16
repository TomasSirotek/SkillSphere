import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDetailComponent } from './box-detail.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { Box } from '../../models/box';

describe('BoxDetailComponent', () => {
  let component: BoxDetailComponent;
  let fixture: ComponentFixture<BoxDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxDetailComponent,RouterTestingModule,HttpClientModule,ToastrModule.forRoot()],
    });
    fixture = TestBed.createComponent(BoxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

});
