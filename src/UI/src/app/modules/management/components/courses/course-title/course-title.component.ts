import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../models/course';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChevronDoubleDown,
  heroChevronDoubleUp,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-course-title',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent],
  templateUrl: './course-title.component.html',
  viewProviders: [provideIcons({ heroChevronDoubleDown, heroChevronDoubleUp })],
})
export class CourseTitleComponent {


  @Input() title: string ;
  @Output() titleChange = new EventEmitter<string>();

 

  onInputChange(event: Event): void {
    const newTitle = (event.target as HTMLInputElement).value;
    this.title = newTitle;
    this.titleChange.emit(newTitle);
  }


}
