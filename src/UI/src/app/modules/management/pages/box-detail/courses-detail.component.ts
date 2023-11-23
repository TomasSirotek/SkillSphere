import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Box } from '../../models/box';
import { CourseService } from '../../services/course-service.service';
import { HttpClientModule } from '@angular/common/http';
import { BoxesHeaderComponent } from '../../components/boxes/boxes-header/boxes-header.component';
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
import { Categories, Chapter, Course } from '../../models/course';
import { ChaptersListComponent } from '../../components/courses/chapters/chapters.component';
import { Observable } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoryService } from '../../services/category-service.service';



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


  ],
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss'],
})
export class CoursesDetailComponent implements OnInit {

  courseId: string;
  course: Course;
  categories$: Observable<Categories[]>;
  selectedCategories: ['Web','Mobile'];


  selectedCar: number;

  cars = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab' },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
  ];



  constructor(private route: ActivatedRoute,private courseService: CourseService,private categoryService: CategoryService) {
    
    // this.categoryService.getAllCategories().subscribe((data: any) => {
    //   this.categories$ = data.categories;
    //   console.log(this.categories$)
    // })

    this.categories$ = new Observable<Categories[]>(observer => {
      observer.next([
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
        {
          id: '3',
          name: 'Desktop',
          avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
        },
      ]);
    }
    )

   }



 


  // DELETE

  isEditing = true;
  isCreating: true;
  isUpdating: any;
  isSubmitting: boolean;


 

 



get completionText(): string {
  const requiredFields = [
    this.course?.title,
    this.course?.description,
    this.course?.coverImageRelativePath,
    this.course?.chapters,
    this.course?.categories,
    this.course?.price,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter((field) => field !== undefined && field !== null).length;
  return `(${completedFields}/${totalFields})`;
}

get isComplete(): boolean {
  const requiredFields = [
    this.course?.title,
    this.course?.description,
    this.course?.coverImageRelativePath,
    this.course?.price,
  ];

  return requiredFields.every(Boolean);
}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.courseId = params.get('id');
    console.log(this.courseId)
  });

  this.courseService.coursesState.subscribe((data: any) => {
    this.course = data.courses?.find((course: Course) => course.id === this.courseId);
    console.log(this.course)
  })




}


toggleEdit() {
  this.isEditing = !this.isEditing;
  }




}
  

 

  


