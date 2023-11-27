import { Component, ElementRef } from '@angular/core';
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
import {  DndModule } from 'ngx-drag-drop'
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars3 } from '@ng-icons/heroicons/outline';
import { Accordion } from "flowbite";
import type { AccordionOptions, AccordionItem, AccordionInterface } from "flowbite";
import { Modal } from 'flowbite'
import { FormsModule } from '@angular/forms';


interface DraggableItem {
  id:string,
  title: string;
  isExpanded?: boolean;
  children: any[];
}

declare const Flowbite: any;


@Component({
  selector: 'app-course-chapters',
  standalone: true,
  imports: [CommonModule,DndModule,NgIconComponent,FormsModule],
  templateUrl: './course-chapters.component.html',
  styleUrls: ['./course-chapters.component.scss'],
  viewProviders: [provideIcons({ heroBars3})]

})


export class CourseChaptersComponent {
  isExpanded: boolean[] = [];
  isCreating: true;



  addChapter() {
    if(this.draggableList.length <= 3)
    // Add new chapter to coursesMock
    this.draggableList.push(
      {
        id:'4',
        title: 'Chapter 4: Ending',
        children: [
          {
            description: 'New chapter',
            position: this.draggableList.length + 1,
            isFree: true,
            videoURL: 'https://www.youtube.com/watch?v=1fNp3Jbqy8o',
          }
        ],
        isExpanded: false,
      },
    );
    console.log(this.draggableList)
  }

  
  toggleAccordion(itemId: string): void {
    const accordionItem = this.draggableList.find(item => item.id === itemId);
    if (accordionItem) {
      accordionItem.isExpanded = !accordionItem.isExpanded;
    }
  }
  
  
  draggableList: DraggableItem[] = [    
    {
      id:"1584848454",
      title: 'Chapter 1: Introduction',
      children: [
        {
          description: 'Introduction to the course',
          position:0,
          isFree: false,
          videoURL: 'https://www.youtube.com/watch?v=1fNp3Jbqy8o',
        }
      ],
      isExpanded: false,

    },
    {
      id:"128141121",
      title: 'Chapter 2: Fundaments ',
      children: [
        {
          description: 'Introduction to the course',
          position:1,
          isFree: true,
          videoURL: 'https://www.youtube.com/watch?v=1fNp3Jbqy8o',
        }
      ],
      isExpanded: false,

    },
   
    
  ];

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === 'move') {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    console.log('onDrop', event, list);
  
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      let index = event.index;
  
      if (typeof index === 'undefined') {
        index = list.length;
      }
  
      // Insert the dragged item at the dropped index
      list.splice(index, 0, event.data);
  
      // Reset positions to consecutive integers starting from 0
      list.forEach((item, i) => {
        item.children[0].position = i;
      });
    }
  }
  

  constructor() { }


 


}
