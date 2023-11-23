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
import { Course } from '../../models/course';



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
  ],
  templateUrl: './courses-detail.component.html',
})
export class CoursesDetailComponent implements OnInit {
  courseId: string;
  course: Course;
  
  constructor(private route: ActivatedRoute,private courseService: CourseService) { }

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

  

}
