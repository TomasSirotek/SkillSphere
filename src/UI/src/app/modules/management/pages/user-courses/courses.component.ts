import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  BoxesHeaderComponent,
  OrderByType,
} from '../../components/boxes/boxes-header/boxes-header.component';
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
import {
  heroBookOpen,
  heroCheckBadge,
  heroHeart,
} from '@ng-icons/heroicons/outline';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { UserService } from 'src/app/core/auth/service/user.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, filter, take, takeUntil } from 'rxjs';

interface PageInfo {
  pageNumber: number;
  totalPages: number;
  totalItems: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

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
  viewProviders: [
    provideIcons({ heroHeart, heroHeartSolid, heroBookOpen, heroCheckBadge }),
  ],
})
export class CoursesComponent implements OnInit {
  handleCorrectText(
    coursePrice: number,
    isOwned: boolean,
    isPurchased: boolean
  ) {
    if (coursePrice === 0) {
      return 'Free';
    } else if (isOwned) {
      return 'Owned';
    } else if (isPurchased) {
      return 'Purchased';
    } else {
      return coursePrice;
    }
  }

  isLoaded = false;
  isDrawerOpen = false;

  currentOpenCourse: Course = null;

  courses: Course[] = [];
  filteredCourses: Course[] = [];

  wishListIds: string[] = [];
  purchasedIds: string[] = [];
  ownedCourseIds: string[] = [];

  // pagination
  pageNumber = 1; // Current page number
  itemsPerPage = 8; // Items per page
  sortBy = 'title'; // Sort by column
  sortDir: OrderByType;
  pageInfo: PageInfo;
  totalPages = 0;

  // search
  isFilterPaneOpen: boolean = true;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private drawerService: DrawerService,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    await this.loadPurchasedCourses();
    await this.loadCourses();

    await this.getWishList();
    await this.getCreatedCourses();
  }

  private async getCreatedCourses() {
    return this.courseService
      .getUserCourses(this.authService.getUserId())
      .subscribe((data: any) => {
        this.ownedCourseIds.push(...data?.courses.map((course) => course.id));
      });
  }

  private async loadPurchasedCourses() {
    return this.courseService
      .getOwnedCourses(this.authService.getUserId())
      .subscribe((data: any) => {
        this.purchasedIds.push(...data?.courses.map((course) => course.id));
      });
  }

  handleChange($event: any) {
    this.itemsPerPage = $event.target.value;
    this.loadCourses();
  }

  handleFilterPaneToggle() {
    this.isFilterPaneOpen = !this.isFilterPaneOpen;
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
    return lastIndex < this.filteredCourses.length
      ? lastIndex
      : this.filteredCourses.length;
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

  private async loadCourses() {
    this.isLoaded = false;

    this.courseService
      .getPaginatedCourses(
        this.pageNumber,
        this.itemsPerPage,
        this.sortBy,
        this.sortDir
      )
      .subscribe((data: any) => {
        this.courses = data?.items;

        // map to page info all ny values from data object
        this.pageInfo = {
          pageNumber: data?.pageNumber,
          totalPages: data?.totalPages,
          totalItems: data?.totalItems,
          hasPreviousPage: data?.hasPreviousPage,
          hasNextPage: data?.hasNextPage,
        };

        this.totalPages = data?.totalPages;

        this.courses?.map((course) => {
          course.isLiked = this.wishListIds.includes(course.id);
          course.isPurchased = this.purchasedIds.includes(course.id);
          course.isOwned = this.ownedCourseIds.includes(course.id);
        });

        setTimeout(() => {
          this.isLoaded = true;
        }, 500);
      });
  }

  private async getWishList() {
    this.courseService
      .getWishList(this.authService.getUserId())
      .subscribe((data: any) => {
        this.wishListIds.push(...data?.courses.map((course) => course.id));
      });
  }

  private onSortChange(sortDir: OrderByType) {
    this.sortDir = sortDir;
    this.loadCourses();
  }

  handleSearchTerm(sortBy: string) {
    this.sortBy = sortBy;
    this.loadCourses();
  }

  handleCurrentPageTerm($isForward: boolean) {
    if (this.pageInfo.hasNextPage && $isForward) {
      this.pageNumber++;
      this.loadCourses();
    } else if (this.pageInfo.hasPreviousPage && !$isForward) {
      this.pageNumber--;
      this.loadCourses();
    } else {
      return;
    }
  }

  handlePageSizeTerm($event: number) {
    this.itemsPerPage = $event;
    this.pageNumber = 1;
    this.loadCourses();
  }

  handleOrderByTerm($event: OrderByType) {
    this.sortDir = $event;
    this.onSortChange($event);
  }
}
