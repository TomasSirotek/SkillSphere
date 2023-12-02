import {
  Component,
  Input,
  NgModule,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BoxesHeaderComponent } from '../../components/boxes/boxes-header/boxes-header.component';
import { BoxesTableComponent } from '../../components/boxes/boxes-table/boxes-table.component';

import {
  NgxDatatableModule,
  ColumnMode,
  DatatableComponent,
} from '@swimlane/ngx-datatable';
import { BoxesModalComponent } from '../../components/boxes/boxes-modal/boxes-modal.component';
import { Box } from '../../models/box';
import { CoursesCardComponent } from '../../components/courses/courses-card/courses-card.component';
import { CourseService } from '../../services/course-service.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { Course } from '../../models/course';
import { CourseDetailDrawer } from '../../components/shared/course-detail-drawer.component';
import { DrawerService } from '../../services/drawer.service';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroHeart } from '@ng-icons/heroicons/outline';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    BoxesHeaderComponent,
    BoxesTableComponent,
    NgxDatatableModule,
    BoxesModalComponent,
    CoursesCardComponent,
    NgxSkeletonLoaderModule,
    RouterLink,
    CourseDetailDrawer,
    FormsModule,
    NgIcon,
  ],
  templateUrl: './courses.component.html',
  viewProviders: [provideIcons({ heroHeart, heroHeartSolid })],
})
export class CoursesComponent implements OnInit {
  isLiked = false;

  isLoaded = false;
  courses: Course[] = [];
  isDrawerOpen = false;

  currentOpenCourse: Course = null;

  filteredCourses: Course[] = [];

  @Input() searchQuery: string = '';

  openDrawer(course: Course) {
    this.drawerService.openModal();
    this.drawerService.setModalData(course);
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    this.currentOpenCourse = null;
  }

  handleLikeCourse(arg0: string) {
    // find the course by id and toggle the like
    // also hit the endpoint for liking the course SignalR
    this.isLiked = !this.isLiked;
  }

  constructor(
    private courseService: CourseService,
    private router: Router,
    private drawerService: DrawerService
  ) {
    courseService.getAllCourses().subscribe((data: any) => {
      this.courses = data.courses;

      setTimeout(() => {
       this.isLoaded = true;
      }, 1000);

      this.filteredCourses = this.courses;
    });
  }

  ngOnInit(): void {}

  filterCourses(): void {
    this.filteredCourses = this.courses.filter((course) =>
      course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSearchTermChange(searchTerm: string): void {
    this.searchQuery = searchTerm;
    this.filterCourses();
  }


}
