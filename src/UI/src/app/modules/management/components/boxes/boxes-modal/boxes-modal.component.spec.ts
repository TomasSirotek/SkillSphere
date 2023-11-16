import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService,DialogRef } from '@ngneat/dialog';
import { BoxesModalComponent } from './boxes-modal.component';

describe('BoxesModalComponent', () => {
  let component: BoxesModalComponent;
  let fixture: ComponentFixture<BoxesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxesModalComponent], // Import the component here
    });

    fixture = TestBed.createComponent(BoxesModalComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with the correct controls', () => {
    expect(component.formGroup.contains('title')).toBeTrue();
    expect(component.formGroup.contains('status')).toBeTrue();
    expect(component.formGroup.contains('color')).toBeTrue();
    expect(component.formGroup.contains('price')).toBeTrue();
    expect(component.formGroup.contains('description')).toBeTrue();
  });

  it('should mark the status control as invalid if it is empty', () => {
    const statusControl = component.formGroup.get('status');
    statusControl.setValue('');
    expect(statusControl.valid).toBeFalse();
  });

  it('should mark the status control as invalid if it has an invalid value', () => {
    const statusControl = component.formGroup.get('status');
    statusControl.setValue('Invalid');
    expect(statusControl.valid).toBeFalse();
  });

  it('should mark the color control as invalid if it is empty', () => {
    const colorControl = component.formGroup.get('color');
    colorControl.setValue('');
    expect(colorControl.valid).toBeFalse();
  });

  it('should mark the price control as invalid if it is empty', () => {
    const priceControl = component.formGroup.get('price');
    priceControl.setValue('');
    expect(priceControl.valid).toBeFalse();
  });

  it('should mark the price control as invalid if it has an invalid value', () => {
    const priceControl = component.formGroup.get('price');
    priceControl.setValue('Invalid');
    expect(priceControl.valid).toBeFalse();
  });

  it('should mark the description control as invalid if it is empty', () => {
    const descriptionControl = component.formGroup.get('description');
    descriptionControl.setValue('');
    expect(descriptionControl.valid).toBeFalse();
  });

  
});