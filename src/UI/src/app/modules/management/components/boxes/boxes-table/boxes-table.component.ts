import { Component, OnInit, TemplateRef, ViewChild,Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
import { Course } from '../../../models/course';
import { AuthService } from 'src/app/core/auth/service/auth.service';

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

export class BoxesTableComponent implements OnInit, OnChanges {


  @Input() selectedValue: any;
  @Output() selectedValueChange: any[] = [];
  
  // emit 
  @Output() emitLikeCourseChange = new EventEmitter<any>();

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;


  @Input() rows: Course[] = [];
  loadingIndicator = true;
  selected = [];
 
  currentPage = 1; // Current page number
  itemsPerPage = 10; // Items per page


  apiConnected: boolean = false;
  definedColors = ['Red', 'Orange', 'White', 'Black'];
  selectedColor: string | null = null;
  columns = [
    { prop: 'title' },
    { name: 'type' },
    { name: 'price' },
    { name: 'color' },
  ];

  isLoading: boolean = false;
  filteredRows: Course[] = [];

  constructor(
    private router: Router,
    private courseService: CourseService,
    private authService: AuthService
  ) {
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    const lastIndex = this.startIndex + this.itemsPerPage;
    return lastIndex < this.rows.length ? lastIndex : this.rows.length;
  }

  get pagedRows(): Course[] {
    return this.rows.slice(this.startIndex, this.endIndex + 1);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedValue']) {
      this.filterBySelectedValue();
    }
  }
  filterBySelectedValue() {
    const selectedValue = this.selectedValue;

    switch (selectedValue) {
      case 'All':
        this.filteredRows = this.rows;
        break;
      case 'Published':
        this.filteredRows = this.rows.filter((row) => row.isPublished === true);
        break;
      case 'Drafts':
        this.filteredRows = this.rows.filter((row) => row.isPublished === false);
        break;
      case 'Archived':
        this.filteredRows = this.rows.filter((row) => row.isPublished === false);
        break;
      default:
        this.filteredRows = this.rows;
        break;
    }

  
  }

  initLoading(value : boolean) {
    this.isLoading = value;
  }



  async ngOnInit() {
    this.isLoading = true;
   // this.filterBySelectedValue();
    const test = this.courseService.getUserCourses(this.authService.getUserId());


    await this.getUserCreatedCourses();
    
  }
  private async getUserCreatedCourses() {
    this.courseService.getUserCourses(this.authService.getUserId()).subscribe((data : any) => {

      this.rows = data.courses;
 
      // emit the objet with values to the parent componet
      this.emitLikeCourseChange.emit(this.rows);
     
      this.apiConnected = true;
      this.isLoading = false;
      this.filterBySelectedValue();
    });

  }



  
 
    
}
