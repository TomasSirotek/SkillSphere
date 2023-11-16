import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  private openModalSubject = new Subject<void>();
  private closeModalSubject = new Subject<void>();

  openModal() {
    this.openModalSubject.next();
  }

  closeModal() {
    this.closeModalSubject.next();
  }

  onOpenModal() {
    return this.openModalSubject.asObservable();
  }

  onCloseModal() {
    return this.closeModalSubject.asObservable();
  }
}
