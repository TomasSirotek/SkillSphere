import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Categories } from '../../../models/course';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDoubleDown, heroChevronDoubleUp } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-course-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule,NgIconComponent],
  templateUrl: './course-categories.component.html',
  styleUrl: './course-categories.component.scss',
  viewProviders: [provideIcons({heroChevronDoubleDown,heroChevronDoubleUp})]

})
export class CourseCategoriesComponent {
  isEditing = true;
  categories$: Observable<Categories[]>;



  @Input() courseCategories: Categories[];
  @Output() courseCategoriesChange = new EventEmitter<Categories[]>();


  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

 
  constructor() {
    this.categories$ = new Observable<Categories[]>((observer) => {
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
    });
  }
}
