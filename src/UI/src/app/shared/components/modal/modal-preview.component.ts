import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Chapter, Course } from 'src/app/modules/management/models/course';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';

@Component({
  selector: 'app-modal-preview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-preview.component.html',
})
export class ModalPreviewComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() course?: Course;
  @Input() title: string = '';
  @Input() description: string = 'Are you sure you want to delete this item?';
  @Output() canceled = new EventEmitter<void>();
  modal: ModalInterface;
  courseTitle: string;
  @Input() descriptionType;
  showPopupModal: any = false;

  constructor() {}

  ngOnDestroy(): void {}

  toggleModal() {
    this.showPopupModal = !this.showPopupModal;
  }

  ngOnInit(): void {
    this.processCourseData(this.course);
  }

  setupModal() {
    const $modalElement: HTMLElement = document.querySelector(
      '#modalCreatePreview'
    );

    const modalOptions: ModalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses:
        'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
      closable: true,
      onHide: () => {},
      onShow: () => {},
      onToggle: () => {},
    };

    this.modal = new Modal($modalElement, modalOptions);
  }

  openModal() {
    this.setupModal();
    this.modal.show();
  }

  toggleAccordion(chapterId: string): void {
    // Find the index of the chapter in the array
    const index = this.course.chapters.findIndex(
      (chapter) => chapter.id === chapterId
    );

    // Toggle the isExpanded property
    if (index !== -1) {
      this.course.chapters[index]['isExpanded'] =
        !this.course.chapters[index]['isExpanded'];
    }
  }

  processCourseData(course: Course): void {
    if (course) {
      // Map chapters to a new array with isExpanded property
      const chaptersWithExpansion: Chapter[] = course.chapters.map(
        (chapter) =>
          ({
            ...chapter,
            isExpanded: false,
          } as unknown as Chapter)
      );

      // Sort chapters based on their positions in the database
      const sortedChapters: Chapter[] = chaptersWithExpansion.sort(
        (a, b) => a.position - b.position
      );

      // Update the course object with the sorted and expanded chapters
      this.course = { ...course, chapters: sortedChapters };
    }
  }

  cancel() {
    this.canceled.emit();
  }
}
