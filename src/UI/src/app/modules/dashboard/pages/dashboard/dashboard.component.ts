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
import { take } from 'rxjs';
import { BoxesHeaderComponent } from 'src/app/modules/management/components/boxes/boxes-header/boxes-header.component';
import { ModalPreviewComponent } from 'src/app/shared/components/modal/modal-preview.component';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';
import { Course } from 'src/app/modules/management/models/course';

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
    ModalPreviewComponent
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
  isLoaded: any;
  modal: ModalInterface;

  userService = inject(UserService);
  filteredCourses: any = [];
  wishListIds: string[] = [];

  constructor() {}

  async ngOnInit() {
    
    this.getWishList();

    await this.userService.loadData().pipe(take(1)).toPromise();

    this.userService.ownedCourses.subscribe((data) => {
      this.filteredCourses = data;

      this.isLoaded = true;

      this.filteredCourses?.map((course) => {
        course.isLiked = this.wishListIds.includes(course.id);
      });
    });
  }

  private async getWishList() {
    await this.userService.loadData().pipe(take(1)).toPromise();
    this.userService.wishList.subscribe((wishlistCourses) => {
      if (wishlistCourses !== null && Array.isArray(wishlistCourses)) {
        this.wishListIds.push(...wishlistCourses.map((course) => course.id));
      }
    });
  }


setupModal() {
  const $modalElement: HTMLElement = document.querySelector('#modalCreatePreview');

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

  handleLikeCourse(arg0: any) {}
}
