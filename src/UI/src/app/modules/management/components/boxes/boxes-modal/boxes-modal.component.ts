import { Component, ChangeDetectionStrategy, inject, ElementRef, ViewChild, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { DialogRef } from '@ngneat/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, UntypedFormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { ModalServiceService } from 'src/app/shared/service/modal-service.service';

interface DialogData {
  title: string;
  withResult: boolean;
}

interface PostBoxDto{
  title: string,
  type: string,
  image: string,
  status: string,
  price: number,
  color: string,
  description: string
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const url = control.value;

    if (!url || isValidUrl(url)) {
      return null; // If the control is empty or a valid URL, consider it valid
    } else {
      return { invalidUrl: true }; // If it's not a valid URL, mark it as invalid
    }
  };
}


@Component({
  selector: 'app-boxes-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './boxes-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxesModalComponent {

  private modalSubscription: Subscription;
  @ViewChild('urlInput') urlInput: ElementRef<HTMLInputElement>;
  postDataForm: FormGroup;
  imageUrl: string | null = null;
  modal: ModalInterface
  formSubmitted = false;

  formGroup: FormGroup;
  @Input() public user;
  @Output() dataEmitter = new EventEmitter<any>();

 

 
 
  ngOnInit() {
    this.modalSubscription = this.modalService.onOpenModal().subscribe((modalData) => {
      // Open the modal with the provided data
      this.openModal();
    });
  }

  setupModal() {
    const $modalElement: HTMLElement = document.querySelector('#modalCreateBox');

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
    this.formGroup.reset();
    this.modal.show();
   }
 
   onCanceled() {
    this.formGroup.reset();

    
    
     this.modal.hide();
   }


 
 
 
   constructor(private fb: FormBuilder, private modalService: ModalServiceService) {
     this.formGroup = this.fb.group({
       title: ['', [Validators.required, Validators.minLength(5)]],
       type: ['', Validators.required],
       status: ['', [Validators.required, Validators.pattern(/^(New|Damaged|Old)$/)]],
       color: ['Select color', [Validators.required, this.colorValidator]],
       image: [
        '',
        [
          Validators.required,
          urlValidator(),
          Validators.pattern(/^https?:\/\/.*$/), // Additional pattern for any URL
        ],
      ],
       price: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
       description: ['', [Validators.required, Validators.minLength(1)]],
     });
   }
 
   colorValidator(control: FormControl) {
     const validColors = ['Red', 'Orange', 'White', 'Black'];
     if (validColors.includes(control.value)) {
       return null; // Valid color selected
     } else {
       return { invalidColor: true }; // Invalid color selected
     }
   }

   updateImageUrl() {
    const imageControl = this.formGroup.get('image');
    if (imageControl && imageControl.valid) {
      this.imageUrl = imageControl.value;
    } else {
      this.imageUrl =
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F005%2F337%2F799%2Foriginal%2Ficon-image-not-found-free-vector.jpg&f=1&nofb=1&ipt=f52452dbc48e6219fbb6733df9d739c35787b1caf2f179cc276183c09c8a39d6&ipo=images';
    }
  }
 
   passBack() {
    this.formSubmitted = true;
    // Check if the form is valid before submitting
    if (this.formGroup.valid) {
      this.dataEmitter.emit(this.formGroup.value);
      this.formGroup.reset();
      this.formSubmitted = false;
      this.modal.hide(); // Close the modal
    }
  }
}  
  // Declare a variable to store the modal reference









