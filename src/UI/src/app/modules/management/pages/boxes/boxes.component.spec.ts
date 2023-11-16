import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesComponent } from './boxes.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('BoxesComponent', () => {
  let component: BoxesComponent;
  let fixture: ComponentFixture<BoxesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxesComponent,HttpClientModule,ToastrModule.forRoot()],
  
    });
    fixture = TestBed.createComponent(BoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
