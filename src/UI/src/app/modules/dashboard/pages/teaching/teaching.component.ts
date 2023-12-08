import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { BoxesHeaderComponent } from 'src/app/modules/management/components/boxes/boxes-header/boxes-header.component';
import { ModalComponent } from 'src/app/modules/management/components/boxes/modal/modal.component';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserCoursesComponent } from '../../components/user-courses/user-courses.component';
import { BoxesTableComponent } from 'src/app/modules/management/components/boxes/boxes-table/boxes-table.component';
import { Course } from 'src/app/modules/management/models/course';
import { CourseService } from 'src/app/modules/management/services/course-service.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';


interface Item {
  id: number;
  name: string;
  value: number;
}

@Component({
  selector: 'app-teaching',
  standalone: true,
  imports: [CommonModule,BoxesHeaderComponent,ModalComponent,UserCoursesComponent,BoxesTableComponent],
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.scss']
})
export class TeachingComponent implements OnInit {

  private modalSubscription: Subscription;
  modal: ModalInterface
  formGroup: FormGroup;

  userCourses: Course[] = [];

  // data 
  selectedValue: any;

  constructor() { } 


  selectedIdx: number | null = null;

  items: Item[] = [
    { id: 1, name: 'All',value:  0},
    { id: 2, name: 'Published', value:0},
    { id: 3, name: 'Drafts',value: 0  },
    { id: 4, name: 'Archived',value:0,},

    // ... add more items as needed
  ];
  
  selectItem(index: number,item:Item): void {
    this.selectedIdx = index;
    this.selectedValue = item.name;
  }

  ngOnInit(): void {
   
  }

  showButton: boolean = false;

  // Handle the emitted length change
  handleCoursesLengthChange(hasCourses: number): void {
    this.showButton = hasCourses > 0;
  }

  // recieve the emitted value
  handleEmitLikeCourseChange($event: any) {
    this.userCourses = $event;
    this.setValues();
  }

  setValues() {
    this.items[0].value = this.userCourses.length;
    this.items[1].value = this.userCourses.filter((course) => course.isPublished != true).length;
    this.items[2].value = this.userCourses.filter((course) => course.isPublished === false).length;
    this.selectItem(0,this.items[0]);
  }

  setupModal() {
    const $modalElement: HTMLElement = document.querySelector('#modalCreate');

   const modalOptions: ModalOptions = {
       placement: 'center',
       backdrop: 'dynamic',
       backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
       closable: true,
       onHide: () => {
        
       },
       onShow: () => {
       
       },
       onToggle: () => {
       },
   }
   
   this.modal =  new Modal($modalElement, modalOptions);
   
  }


  openModal() {
    // set the modal menu element
    this.setupModal();
    this.modal.show();
   }
   

   closeModal() {
    this.modal.hide();
   }


}
