import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  NgControl,
  NgModel,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroArrowSmallLeft,
  heroCheckCircle,
  heroExclamationCircle,
} from '@ng-icons/heroicons/outline';
import { CourseChaptersComponent } from 'src/app/modules/management/components/courses/course-chapters/course-chapters.component';
import { CourseCategoriesComponent } from 'src/app/modules/management/components/courses/course-categories/course-categories.component';
import { CoursePriceComponent } from 'src/app/modules/management/components/courses/course-price/course-price.component';
import { CourseImageUploadComponent } from 'src/app/modules/management/components/courses/course-image-upload/course-image-upload.component';
import { CourseDescriptionComponent } from 'src/app/modules/management/components/courses/course-description/course-description.component';
import { CourseTitleComponent } from 'src/app/modules/management/components/courses/course-title/course-title.component';
import { BoxesHeaderComponent } from 'src/app/modules/management/components/boxes/boxes-header/boxes-header.component';
import { Course } from 'src/app/modules/management/models/course';




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


  coursesTitles = "Add a new course"
  courseId: string;


  coursez: Course = {
    id: '',
    title: 'Advanced web development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
    coverImageRelativePath: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
    price: 29.99,
    categories: [
      {
        id: '1',
        name: 'Web',
        avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
      },
      {
        id: '2',
        name: 'Mobile',
        avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
      },
    ],
    chapters: [],
    isPublished: false,
  };

  isFirstChapterCompleted = true;

  constructor(private route: ActivatedRoute) {}

  get completionText(): string {
    const requiredFields = [
      this.coursez?.title,
      this.coursez?.description,
      this.coursez?.coverImageRelativePath,
      this.coursez?.chapters,
      this.coursez?.categories,
      this.coursez?.price,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(
      (field) =>
        field !== undefined &&
        field !== null &&
        (typeof field !== 'string' || field.trim() !== '') &&
        (Array.isArray(field) ? field.length > 0 : true)
    ).length;
    return `(${completedFields}/${totalFields})`;
  }

  get isComplete(): boolean {
    const requiredFields = [
      this.coursez?.title,
      this.coursez?.description,
      this.coursez?.coverImageRelativePath,
      this.coursez?.price,
    ];

    return requiredFields.every(
      (field) =>
        field !== undefined &&
        field !== null &&
        (typeof field !== 'string' || field.trim() !== '')
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id');
    });

    // this.courseService.coursesState.subscribe((data: any) => {
    //   this.course = data.courses?.find(
    //     (course: Course) => course.id === this.courseId
    //   );
    // });
  }


  saveAsDraft() {
      // logic for saving as draft 
      // 1. must meet certain criteria
      // 2. must be able to save as draft
      // 3. save as draft 
  }

  publishCourse() {
    // logic for publishing course
    // 1. must meet certain criteria
    // 2. must be able to publish
    // 3. publish course

  }


}
