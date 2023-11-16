import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesHeaderComponent } from './boxes-header.component';

describe('BoxesHeaderComponent', () => {
  let component: BoxesHeaderComponent;
  let fixture: ComponentFixture<BoxesHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxesHeaderComponent]
    });
    fixture = TestBed.createComponent(BoxesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
