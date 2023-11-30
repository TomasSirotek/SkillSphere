import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesHeaderComponent } from './boxes-header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('BoxesHeaderComponent', () => {
  let component: BoxesHeaderComponent;
  let fixture: ComponentFixture<BoxesHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxesHeaderComponent,HttpClientTestingModule, ToastrModule.forRoot()]
    });
    fixture = TestBed.createComponent(BoxesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
