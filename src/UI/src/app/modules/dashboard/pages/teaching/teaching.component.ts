import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { BoxesHeaderComponent } from 'src/app/modules/management/components/boxes/boxes-header/boxes-header.component';
import { ModalComponent } from 'src/app/modules/management/components/boxes/modal/modal.component';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserCoursesComponent } from '../../components/user-courses/user-courses.component';

@Component({
  selector: 'app-teaching',
  standalone: true,
  imports: [CommonModule,BoxesHeaderComponent,ModalComponent,UserCoursesComponent],
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.scss']
})
export class TeachingComponent implements OnInit {
  private modalSubscription: Subscription;
  modal: ModalInterface
  formGroup: FormGroup;

  
  ngOnInit(): void {
    
  }

  showButton: boolean = false;

  // Handle the emitted length change
  handleCoursesLengthChange(hasCourses: number): void {
    this.showButton = hasCourses > 0;
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
