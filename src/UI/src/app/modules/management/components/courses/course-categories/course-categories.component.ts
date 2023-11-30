import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Categories } from '../../../models/course';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDoubleDown, heroChevronDoubleUp } from '@ng-icons/heroicons/outline';
import { CourseService } from '../../../services/course-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-course-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule,NgIconComponent],
  templateUrl: './course-categories.component.html',
  styleUrl: './course-categories.component.scss',
  viewProviders: [provideIcons({heroChevronDoubleDown,heroChevronDoubleUp})]

})
export class CourseCategoriesComponent {

  categories$: Observable<Categories[]>;

  @Input() courseCategories: Categories[];
  @Output() courseCategoriesChange = new EventEmitter<Categories[]>();



  constructor(private courseService: CourseService) {
    this.categories$ = this.courseService.getAllCategories().pipe(
      map((data: any) => data.categories.map((category: any) => category))
    );
  }

  onCategoriesChange() {
    this.courseCategoriesChange.emit(this.courseCategories);
  }

}
