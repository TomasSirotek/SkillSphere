import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Box } from '../../../models/box';
import { FormsModule, NgModel } from '@angular/forms';
import { State } from 'src/app/shared/state';

import {
  NgxDatatableModule,
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { CourseService } from '../../../services/course-service.service';
import { Router } from '@angular/router';
import { BoxesTableItemComponent } from '../boxes-table-item/boxes-table-item.component';
import { BoxesModalComponent } from '../boxes-modal/boxes-modal.component';

@Component({
  selector: 'app-boxes-table',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    BoxesTableComponent,
    NgxDatatableModule,
    BoxesTableItemComponent,
    BoxesModalComponent,
  ],
  templateUrl: './boxes-table.component.html',
  styleUrls: ['./boxes-table.component.scss'],
})

export class BoxesTableComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  rows: Box[] = [];
  temp = [];
  loadingIndicator = true;
  selected = [];
  currentPage = 1; // Current page number
  itemsPerPage = 11; // Items per page
  apiConnected: boolean = false;
  definedColors = ['Red', 'Orange', 'White', 'Black'];
  selectedColor: string | null = null;
  columns = [
    { prop: 'title' },
    { name: 'type' },
    { name: 'price' },
    { name: 'color' },
  ];

  searchTerm: string = '';
  isLoading: boolean = false;
  filteredRows: any[] = [];

  constructor(
    private boxService: CourseService,
    private state: State,
    private router: Router
  ) {
    this.fetchBoxes(boxService, state);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    const lastIndex = this.startIndex + this.itemsPerPage - 1;
    return lastIndex < this.rows.length ? lastIndex : this.rows.length - 1;
  }

  get pagedRows(): Box[] {
    return this.rows.slice(this.startIndex, this.endIndex + 1);
  }
  fetchBoxes(boxService: CourseService, state: State) {
    this.isLoading = true;
  
    
  }
  

  handleData(data: any) {
  
  }

  ngOnInit(): void {}

  editBox(boxId: number) {
    this.router.navigate(['/management/boxes', boxId]);
  }


  filterInventory() {
    // Apply color filtering if a color is selected
    if (this.selectedColor) {
      this.filteredRows = this.rows.filter(
        (inventory) => inventory.color === this.selectedColor
      );
    } else {
      // Apply filtering based on search term if no color is selected
      const lowerCaseSearchTerm = this.searchTerm.trim().toLowerCase();
      this.filteredRows = this.rows.filter(
        (inventory) =>
          !this.searchTerm.trim() ||
          inventory.title.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Reset the current page to 1 after filtering
    this.currentPage = 1;
  }

  selectColor(color: string) {
    if (this.selectedColor === color) {
      // Deselect the color if it's already selected
      this.selectedColor = null;
    } else {
      this.selectedColor = color;
    }

    // Call the filtering method here
    this.filterInventory();
  }
}
