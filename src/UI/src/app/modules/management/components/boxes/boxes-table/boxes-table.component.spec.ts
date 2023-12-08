import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesTableComponent } from './boxes-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { Box } from '../../../models/box';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('BoxesTableComponent', () => {
  let component: BoxesTableComponent;
  let fixture: ComponentFixture<BoxesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxesTableComponent, HttpClientModule, ToastrModule.forRoot(),RouterTestingModule],
    });
    fixture = TestBed.createComponent(BoxesTableComponent);
    component = fixture.componentInstance;

 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('input empty table data message', () => {
    it('should render empty message when table data are empty', () => {
      const testRows = [] as Box[];
      component.apiConnected = true;
      component.isLoading = false;

      fixture.detectChanges();

      const emptyMessage = fixture.debugElement.query(
        By.css('[data-testid="no-data-message"]')
      );

      expect(emptyMessage).toBeTruthy();
    });
  });

  describe('input no data available when api fails', () => {
    it('should render empty message when table data are empty', () => {
      component.apiConnected = false;
      component.isLoading = false;

      fixture.detectChanges();

      const emptyMessage = fixture.debugElement.query(
        By.css('[data-testid="no-api-message"]')
      );

      expect(emptyMessage).toBeTruthy();
    });
  });

  describe('input no data available when api is loading', () => {
    it('should render empty message when table data are empty', () => {
      component.apiConnected = true;
      component.isLoading = true;

      const emptyMessage = fixture.debugElement.query(
        By.css('[data-testid="loader"]')
      );

      expect(emptyMessage).toBeTruthy();
    });
  });

  describe('input search bar', () => {
    it('should render empty message when table data are empty', () => {
      component.apiConnected = true;
      component.isLoading = false;
      component.filteredRows = component.rows;

      fixture.detectChanges();

      const emptyMessage = fixture.debugElement.query(
        By.css('[data-testid="no-data-message"]')
      );

      expect(emptyMessage).toBeTruthy();
    });
  });
});
