import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoxesTableItemComponent } from './boxes-table-item.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('BoxesTableItemComponent', () => {
  let component: BoxesTableItemComponent;
  let fixture: ComponentFixture<BoxesTableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxesTableItemComponent,RouterTestingModule]
    });
    fixture = TestBed.createComponent(BoxesTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call editBox method when edit button is clicked', () => {
    spyOn(component, 'editBox');
   
    const editButton = fixture.debugElement.query(By.css('[data-testid="edit-btn-test"]'));
   
    editButton.triggerEventHandler('click', null);
   
    expect(component.editBox).toHaveBeenCalled();
  });
});