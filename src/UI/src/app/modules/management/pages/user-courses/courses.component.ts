import {
  Component,
  Input,
  NgModule,
  OnDestroy,
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
import { heroBookOpen, heroCheckBadge, heroHeart } from '@ng-icons/heroicons/outline';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { UserService } from 'src/app/core/auth/service/user.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, filter, take, takeUntil } from 'rxjs';

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
  viewProviders: [provideIcons({ heroHeart, heroHeartSolid, heroBookOpen,heroCheckBadge })],
})
export class CoursesComponent implements OnInit {

  isLoaded = false;
  isDrawerOpen = false;

  currentOpenCourse: Course = null;

  courses: Course[] = [];
  filteredCourses: Course[] = [];

  wishListIds: string[] = [];
  purchasedIds: string[] = [];

  // pagination  
  pageNumber = 1; // Current page number
  itemsPerPage = 8; // Items per page
  sortBy = 'title'; // Sort by column
  sortDir: 'asc' | 'desc' = 'asc'; // Sort direction
  pageInfo = {}

  constructor(
    private courseService: CourseService,
    private router: Router,
    private drawerService: DrawerService,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}


  ngOnInit(): void {

    
    
    this.loadCourses();
    
    
    this.getWishList();
    this.getPurchasedCourses();
  }

  handleSearchTerm($event: string) {
    console.log($event);

    // search term 
  }

  handleChange($event: any) {
    this.itemsPerPage = $event.target.value;
    this.loadCourses();

    }
  


  openDrawer(course: Course) {
    this.drawerService.openModal();
    this.drawerService.setModalData(course);
  }


  closeDrawer() {
    this.isDrawerOpen = false;
    this.currentOpenCourse = null;
  }

  get startIndex(): number {
    return (this.pageNumber - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    const lastIndex = this.startIndex + this.itemsPerPage;
    return lastIndex < this.filteredCourses.length ? lastIndex : this.filteredCourses.length;
  }


  handleLikeCourse(courseId: string) {
    // Find the course by ID in the loaded courses
    const course = this.courses.find((c) => c.id === courseId);

    if (!course) {
      return;
    }

     // Toggle the like
    course.isLiked = !course.isLiked;


    if (course.isLiked) {
      this.courseService
        .addCourseToWishlist(courseId, this.authService.getUserId())
        .subscribe({
          next: () => {
            course.likes++;
            course.isLiked = true;
          },
          error: (error) => this.handleError(error, course),
        });
    } else {
      this.courseService
        .removeCourseFromWishlist(courseId, this.authService.getUserId())
        .subscribe({
          next: () => {
            course.likes--;
            course.isLiked = false;
          },
          error: (error) => this.handleError(error, course),
        });
    }
  }

  private handleError(error: any, course: Course) {
    this.toastr.error(error.message, 'Error');
    course.isLiked = !course.isLiked; // Roll back the change

  }

  
 

  private async getWishList() {
    await this.userService.loadData().pipe(take(1))
    this.userService.wishList.subscribe((wishlistCourses) => {
      if (wishlistCourses !== null && Array.isArray(wishlistCourses)) {
        this.wishListIds.push(...wishlistCourses.map((course) => course.id));
      }
    });
  }
  
  private async getPurchasedCourses() {
    await this.userService.loadData().pipe(take(1))
    this.userService.ownedCourses.subscribe((ownedCourses) => {
      if (ownedCourses !== null && Array.isArray(ownedCourses)) {
        this.purchasedIds.push(...ownedCourses.map((course) => course.id));
      }
    });
  }
  
  // needs to be replaced with pagination and filter
  private async loadCourses() {

    
    await this.userService.loadData().pipe(take(1))
    this.isLoaded = false;
    

    this.courseService.getPaginatedCourses(this.pageNumber,this.itemsPerPage,this.sortBy,this.sortDir).subscribe((data: any) => {
      this.courses = data?.items;
      this.pageInfo = data?.pageInfo;

            setTimeout(() => {
        this.isLoaded = true;
      }, 500);
    });
  }

  private onPageChange(page: number) {
    this.pageNumber = page;
    this.loadCourses();
  }

  private onSortChange(sortBy: string, sortDir: "asc" | "desc") {
    this.sortBy = sortBy;
    this.sortDir = sortDir;
    this.loadCourses();
  }
 

 
}
