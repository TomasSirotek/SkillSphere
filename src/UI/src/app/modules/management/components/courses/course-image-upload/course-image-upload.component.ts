import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import {
  heroChevronDoubleDown,
  heroChevronDoubleUp,
  heroXMark,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-course-image-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent],
  templateUrl: './course-image-upload.component.html',
  viewProviders: [provideIcons({ heroChevronDoubleDown, heroXMark })],
})
export class CourseImageUploadComponent implements OnInit {


  ngOnInit(): void {}

  isEditing = true;
  isUrlValid: boolean = true;

  @Input() uploadedFileUrl: string | null = null;
  @Output() uploadedFileUrlChange = new EventEmitter<string>();

 
  reuploadImage() {
    this.uploadedFileUrl = null;
  }

  onInputChange(event: Event) {
    const newUrl = (event.target as HTMLInputElement).value;

    this.uploadedFileUrl = newUrl;
    this.uploadedFileUrlChange.emit(newUrl);
  }


}
