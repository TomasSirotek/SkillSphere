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

  @Input() uploadedFileUrl: string | null = null;
  @Output() uploadedFileUrlChange = new EventEmitter<string>();

  handleFileUpload(event: any): void {
    const fileInput = event.target;
    const uploadedFile = fileInput.files[0];

    if (uploadedFile) {
      this.convertFileToUrl(uploadedFile);
    }
  }

  convertFileToUrl(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.uploadedFileUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  reuploadImage(): void {
    // Handle the logic for reuploading or deleting the image
    this.uploadedFileUrl = null;
  }
}
