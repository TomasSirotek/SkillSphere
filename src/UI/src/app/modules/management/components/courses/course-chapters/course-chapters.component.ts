import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chapter } from '../../../models/course';
import {
  DndDraggableDirective,
  DndDropEvent,
  DndDropzoneDirective,
  DndHandleDirective,
  DndPlaceholderRefDirective,
  DropEffect,
} from 'ngx-drag-drop';
import { DndModule } from 'ngx-drag-drop';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars3 } from '@ng-icons/heroicons/outline';
import { Accordion } from 'flowbite';
import type {
  AccordionOptions,
  AccordionItem,
  AccordionInterface,
} from 'flowbite';
import { Modal } from 'flowbite';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

interface DraggableItem {
  id?: string;
  title?: string;
  isExpanded?: boolean;
  position: number;
  children: any[];
}

declare const Flowbite: any;
@Component({
  selector: 'app-course-chapters',
  standalone: true,
  imports: [CommonModule, DndModule, NgIconComponent, FormsModule],
  templateUrl: './course-chapters.component.html',
  styleUrls: ['./course-chapters.component.scss'],
  viewProviders: [provideIcons({ heroBars3 })],
})
export class CourseChaptersComponent implements OnInit, OnChanges {

  isExpanded: boolean[] = [];
  isCreating: true;

  @Input() courseChapters: Chapter[] | null = null;
  @Output() courseChaptersChange = new EventEmitter<Chapter[]>();

  draggableList: DraggableItem[];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.draggableList = this.mapChaptersToDraggable(this.courseChapters);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseChapters']) {
      const currentChapters = changes['courseChapters'].currentValue;
      const previousChapters = changes['courseChapters'].previousValue;
    }
  }


  addChapter() {
    if (this.draggableList.length <= 3) {
      // Add new chapter to coursesMoc
      const newPosition = this.draggableList.length;
      this.draggableList.push({
        id: uuidv4(),
        title: '',
        children: [
          {
            description: '',
            isFree: false,
            videoURL: '',
          },
        ],
        position: newPosition,
        isExpanded: false,
      });

      this.updateItemPositions();


      this.courseChaptersChange.emit(
        this.mapDraggableToChapters(this.draggableList)
      );
    } else {
      alert("You can't add more than 4 chapters for now :)");
    }
  }

  updateItemPositions() {
    // Update positions for all items in the list based on their current index
    this.draggableList.forEach((item, index) => {
      item.position = index;
    });
  }

  toggleAccordion(itemId: string): void {
    const accordionItem = this.draggableList.find((item) => item.id === itemId);
    if (accordionItem) {
      accordionItem.isExpanded = !accordionItem.isExpanded;
    }
  }
  mapChaptersToDraggable(chapters: Chapter[]): DraggableItem[] {
    // Sort chapters based on their position property
    const sortedChapters = chapters.sort((a, b) => a.position - b.position);
  
    // Map the sorted chapters to DraggableItem
    return sortedChapters.map((chapter) => ({
      id: chapter.id,
      title: chapter?.title,
      children: [
        {
          description: chapter.description,
          isFree: chapter.isFree,
          videoURL: chapter.videoURL,
          position: chapter.position, // Keep the original position from the database
        },
      ],
      position: chapter.position,
      isExpanded: false,
    }));
  }
  

  mapDraggableToChapters(draggableList: DraggableItem[] | null): Chapter[] {
    if (!draggableList) {
      return []; // or handle appropriately for your use case
    }

    return draggableList.map((draggableItem) => ({
      id: draggableItem.id,
      title: draggableItem?.title,
      position: draggableItem.position, // Added null check here
      description: draggableItem.children[0]?.description,
      isFree: draggableItem.children[0]?.isFree,
      videoURL: draggableItem.children[0]?.videoURL,
    }));
  }


  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === 'move') {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      let index = event.index;
  
      if (typeof index === 'undefined') {
        index = list.length;
      }
  
      // Insert the dragged item at the dropped index
      list.splice(index, 0, event.data);
  
      // Reset positions to consecutive integers starting from 0
      list.forEach((item, i) => {
        item.position = i;
      });
  
      // Trigger change detection
      this.cdr.detectChanges();
  
      // Update item positions after change detection
      this.updateItemPositions();
  
      console.log(this.draggableList[0].title + " " + this.draggableList[0].position);
      console.log(this.draggableList[1].title + " " +  this.draggableList[1].position);
      console.log(this.draggableList[2].title + " " + this.draggableList[2].position);
     
      this.courseChaptersChange.emit(
        this.mapDraggableToChapters(this.draggableList)
      );
    }
  }
  

  removeChapter(chapterId: string): void {
    if(this.draggableList.length === 1) {
      alert("You must have at least one chapter");
      return;
    }
    const indexToRemove = this.draggableList.findIndex(
      (item) => item.id === chapterId
    );

    if (indexToRemove !== -1) {
      this.draggableList.splice(indexToRemove, 1);
      this.updateCourseChapters();
      this.updateItemPositions();
    }
    this.courseChaptersChange.emit(
      this.mapDraggableToChapters(this.draggableList)
    );
  }

  updateCourseChapters(): void {
    const updatedChapters = this.draggableList.flatMap(
      (draggableItem) => draggableItem.children
    );
    this.courseChaptersChange.emit(updatedChapters);
  }

  updateValue(event: any): void {
    this.courseChaptersChange.emit(
      this.mapDraggableToChapters(this.draggableList)
    );
  }

}

