import { Component, HostListener, NgModule, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { CourseChaptersComponent } from 'src/app/modules/management/components/courses/course-chapters/course-chapters.component';
import { CourseCategoriesComponent } from 'src/app/modules/management/components/courses/course-categories/course-categories.component';
import { CoursePriceComponent } from 'src/app/modules/management/components/courses/course-price/course-price.component';
import { CourseImageUploadComponent } from 'src/app/modules/management/components/courses/course-image-upload/course-image-upload.component';
import { CourseDescriptionComponent } from 'src/app/modules/management/components/courses/course-description/course-description.component';
import { CourseTitleComponent } from 'src/app/modules/management/components/courses/course-title/course-title.component';
import { BoxesHeaderComponent } from 'src/app/modules/management/components/boxes/boxes-header/boxes-header.component';
import { Course } from 'src/app/modules/management/models/course';
import { CourseService } from 'src/app/modules/management/services/course-service.service';
import { heroArrowSmallLeft, heroCheckCircle, heroExclamationCircle } from '@ng-icons/heroicons/outline';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-courses-detail',
  standalone: true,
  imports: [
    CommonModule,
    BoxesHeaderComponent,
    ConfirmModalComponent,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    NgSelectModule,
    NgIconComponent,

    CourseTitleComponent,
    CourseDescriptionComponent,
    CourseImageUploadComponent,
    CoursePriceComponent,
    CourseCategoriesComponent,
    CourseChaptersComponent,
    NgClass,
    NgSelectModule,
  ],
  templateUrl: './courses-detail.component.html',
  viewProviders: [
    provideIcons({
      heroExclamationCircle,
      heroCheckCircle,
      heroArrowSmallLeft,
    }),
  ],
})
export class CoursesDetailComponent implements OnInit {
  coursesTitles = "Add a new course";
  courseId: string;
  course: Course;
  totalFields : number;

  isCourseCompleted = false;
  isSavedFirst =  false;
  isChanged = false;

  constructor(public router: Router, private courseService: CourseService, private route : ActivatedRoute,private toastService: ToastrService) { }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): any {
    if (this.isChanged) {
      const message = 'You have unsaved changes. Are you sure you want to leave?';
      $event.returnValue = message;
      return message;
    }
  }

  handleBackNavigation(): void {
    // Check if there are unsaved changes
    if (this.isChanged) {
      const confirmMessage = 'You have unsaved changes. Do you want to stay on this page?';
      const shouldStayOnPage = window.confirm(confirmMessage);
  
      // If the user doesn't want to stay, reset isChanged and navigate back
      if (!shouldStayOnPage) {
        this.resetIsChanged();
        window.history.go(-1);;
      }
    }
  }
  

  resetIsChanged(): void {
    // Reset isChanged when changes are saved or discarded
    this.isChanged = false;
  }
  get completionText(): string {


    const requiredFields = [
      this.course?.title,
      this.course?.description,
      this.course?.coverImageRelativePath,
      this.course?.chapters,
      this.course?.categories,
      this.course?.price,
    ];

     this.totalFields = requiredFields.length;

    
    const completedFields = requiredFields.filter(
      (field) => field !== undefined &&
        field !== null &&
        (typeof field !== 'string' || field.trim() !== '') &&
        (Array.isArray(field) ? field.length > 0 : true)
    ).length;

    this.isCourseCompleted = completedFields === this.totalFields;

    return `(${completedFields}/${this.totalFields})`;
  }


  async ngOnInit() {

    window.onpopstate = () => {
      this.handleBackNavigation();
    };
    
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id');
   
    });

    await this.getCourseById();



  }

  private async getCourseById() {
    this.courseService
    .getCourseByUserId(this.courseId)
    .subscribe((data: any) => {
      this.course = data;
    });
   
  }



  onCourseTitleChange(newTitle: string): void {
    this.course.title = newTitle;
    this.isChanged = true;
  }

  onCourseDescriptionChange(newDescription: string): void {
    this.course.description = newDescription;
    this.isChanged = true;

  }

  onCoursePriceChange(newPrice: number) {
    this.course.price = newPrice;
    this.isChanged = true;

  }


  onCourseCategoryChange($event: any) {
    this.isChanged = true;
    this.course.categories = $event;
  }

  onCourseImageRelativePath($event: string) {
    this.course.coverImageRelativePath = $event;
    this.isChanged = true;

  }

  onCourseChapterChange($event: any[]) {
    this.course.chapters = $event;
    this.isChanged = true;
  }



  saveCourse() {
    if(this.course.isPublished){
        this.toastService.error('You can not update a published course! Please unpublish the course first.');
        return;
      }

    this.courseService.saveCourseDraft(this.course.id, this.course).subscribe({
      next: (response) => {
        // Handle the response here
      },
      error: (error) => {
        // Handle errors here

      }
    });
    this.isChanged = false;
  }

  publishCourse() {

    // if course has enrolees then you cannot unpublish it only update changes 

    this.course.isPublished = !this.course.isPublished;
    this.isChanged = false;

    this.courseService.publishCourse(this.course.id, this.course.isPublished).subscribe({
      next: (response) => {
        // Handle the response here
      },
      error: (error) => {
        // Handle errors here
      }
    });
  }



}
