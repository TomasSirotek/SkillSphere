import { Component, HostListener, NgModule, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

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
      this.course?.description === '<p></p>' ? null : this.course?.description,
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


  ngOnInit(): void {

    window.onpopstate = () => {
      this.handleBackNavigation();
    };
    
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id');
    });

    this.courseService.coursesState.subscribe((data: any) => {
      this.course = data.courses?.find(
        (course: Course) => course.id === this.courseId
      );
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
    // logic for saving as draft 
    // 1. cannot save if the fields are not filled out 
    // 2. must be able to save as draft


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
     // if this course is published then course published true and if not then false
    // swift boolean values
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

    // logic for publishing course
    // 0. Cannot ppublsj if the course is not complete
    // 1. All the fields must be filled out
    // 2. Take whole course and send it to the /publish endpoint with params true or false when ever to publish it 
    // 3. Get back value
  }



}
