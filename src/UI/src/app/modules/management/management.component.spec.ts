import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementComponent } from './management.component';
import { HttpClientModule } from '@angular/common/http';


describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ManagementComponent,HttpClientModule],
    });
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
