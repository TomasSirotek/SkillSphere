import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Box } from '../../models/box';
import { BoxServiceService } from '../../services/box-service.service';
import { HttpClientModule } from '@angular/common/http';
import { BoxesHeaderComponent } from '../../components/boxes/boxes-header/boxes-header.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  NgControl,
  NgModel,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-box-detail',
  standalone: true,
  imports: [
    CommonModule,
    BoxesHeaderComponent,
    ConfirmModalComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.scss'],
})
export class BoxDetailComponent {
  formGroup: FormGroup;
  imageUrl: string | null = null;
  modal: ModalInterface;
  formSubmitted = false;

  box: Box;
  id: number;
  isDeleteModalOpen = true;

  formData: {
    title: string;
    type: string;
    status: string;
    price: number;
    color: string;
    image: string;
    description: string;
  };

  async ngOnInit() {
 
  }


  
  openModal() {
    // set the modal menu element

    this.modal.show();
  }

  onCanceled() {
    this.modal.hide();
  }
}
