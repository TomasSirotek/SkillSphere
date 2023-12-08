import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPreviewComponent } from './modal-preview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('ModalComponent', () => {
  let component: ModalPreviewComponent;
  let fixture: ComponentFixture<ModalPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPreviewComponent,HttpClientTestingModule, ToastrModule.forRoot()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
