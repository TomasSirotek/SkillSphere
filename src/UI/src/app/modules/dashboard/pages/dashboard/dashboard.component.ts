import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardServiceService } from '../../service/dashboard-service.service';
import { AlertServiceService } from 'src/app/shared/service/alert-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { UserService } from 'src/app/core/auth/service/user.service';
import {
  heroBookOpen,
  heroCheckBadge,
  heroHeart,
} from '@ng-icons/heroicons/outline';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { Observable, forkJoin, take, tap } from 'rxjs';
import { BoxesHeaderComponent } from 'src/app/modules/management/components/boxes/boxes-header/boxes-header.component';
import { ModalPreviewComponent } from 'src/app/shared/components/modal/modal-preview.component';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';
import { Course } from 'src/app/modules/management/models/course';
import { CourseService } from 'src/app/modules/management/services/course-service.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    NgIcon,
    BoxesHeaderComponent,
    ModalPreviewComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [
    provideIcons({ heroHeart, heroHeartSolid, heroBookOpen, heroCheckBadge }),
  ],
})
export class DashboardComponent implements OnInit {
  selectedCourse: Course;

  handleCancelPreviewModal() {
    this.modal.hide();
  }
  isLoaded = false;
  modal: ModalInterface;

  userService = inject(UserService);
  filteredCourses: any = [];
  wishListIds: string[] = [];

  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    forkJoin([
        this.getWishList(),
        this.loadOwnedCourses()
    ]).subscribe(([wishListData, ownedCoursesData]) => {
        this.filteredCourses = ownedCoursesData?.courses;

        this.filteredCourses?.map((course) => {
            course.isLiked = this.wishListIds.includes(course.id);
        });

        setTimeout(() => {
            this.isLoaded = true;
        }, 500);
    });
}

private getWishList(): Observable<any> {
    return this.courseService.getWishList(this.authService.getUserId())
        .pipe(
            tap((data: any) => {
                this.wishListIds.push(...data?.courses.map((course) => course.id));
            })
        );
}

private loadOwnedCourses(): Observable<any> {
    return this.courseService.getOwnedCourses(this.authService.getUserId());
}


  setupModal() {
    const $modalElement: HTMLElement = document.querySelector(
      '#modalCreatePreview'
    );

    const modalOptions: ModalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses:
        'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
      closable: true,
      onHide: () => {},
      onShow: () => {},
      onToggle: () => {},
    };

    this.modal = new Modal($modalElement, modalOptions);
  }

  openModal(index: any) {
    this.selectedCourse = this.filteredCourses[index];
    this.setupModal();
    this.modal.show();
  }

  handleCancleModal() {
    this.modal.hide();
  }

  handleLikeCourse(courseId: any) {
    const course = this.filteredCourses.find((c) => c.id === courseId);

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
    course.isLiked = !course.isLiked; // Roll back the change
  }
}
