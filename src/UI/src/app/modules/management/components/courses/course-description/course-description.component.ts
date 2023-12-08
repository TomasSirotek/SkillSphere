import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDoubleDown } from '@ng-icons/heroicons/outline';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-course-description',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent, NgxEditorModule],
  templateUrl: './course-description.component.html',
  viewProviders: [provideIcons({ heroChevronDoubleDown })],
})
export class CourseDescriptionComponent {
  isEditing = false;

  @Input() courseDescription: string;
  @Output() courseDescriptionChange = new EventEmitter<string>();


  ngOnInit(): void {
   
  }

  // make sure to destory the editor


  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  toggleSave() {
    this.isEditing = false;
    this.courseDescriptionChange.emit(this.courseDescription);
  }

  onInputChange(event: Event) {
    const newDescription = (event.target as HTMLElement).innerHTML;

    this.courseDescription = newDescription;

    this.courseDescriptionChange.emit(newDescription);

  }
}
