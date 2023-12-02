import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private openModalSubject = new Subject<boolean>();
  private modalDataSubject = new Subject<Course>();
  private closeModalSubject = new Subject<boolean>();

  openModal() {
    this.openModalSubject.next(true);
  }

  closeModal() {
    this.closeModalSubject.next(false);
    this.resetModalData();
  }

  onOpenModal() {
    return this.openModalSubject.asObservable();
  }

  onCloseModal() {
    return this.closeModalSubject.asObservable();
  }

  getOpenModalStatus() {
    return this.openModalSubject.asObservable();
  }

  setModalData(data: Course) {
    this.modalDataSubject.next(data);
  }
  getModalData() {
    return this.modalDataSubject.asObservable();
  }
  private resetModalData() {
    this.modalDataSubject.next(null);
  }
}
