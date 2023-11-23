import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BoxesHeaderComponent } from '../../components/boxes/boxes-header/boxes-header.component';
import { BoxesTableComponent } from '../../components/boxes/boxes-table/boxes-table.component';

import { NgxDatatableModule,ColumnMode,DatatableComponent } from '@swimlane/ngx-datatable';
import { BoxesModalComponent } from '../../components/boxes/boxes-modal/boxes-modal.component';
import { Box } from '../../models/box';
import { CoursesCardComponent } from '../../components/courses/courses-card/courses-card.component';
import { CourseService } from '../../services/course-service.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { Course } from '../../models/course';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [ CommonModule,BoxesHeaderComponent,BoxesTableComponent,NgxDatatableModule,BoxesModalComponent,CoursesCardComponent,NgxSkeletonLoaderModule,RouterLink],
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit {
  isLoaded = false;
  courses: Course[] = []

  constructor(private courseService: CourseService,private router: Router) { 

    courseService.getAllCourses().subscribe((data: any) => {
      this.courses = data.courses;
     
      this.isLoaded = true;
    })

  }

  ngOnInit(): void {
  
    
  }


}
