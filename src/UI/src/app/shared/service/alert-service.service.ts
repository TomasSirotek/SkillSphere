import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {
  private alertSubject = new Subject<Alert>();


  showSuccess(message: string) {
    this.alertSubject.next({ type: 'success', message });
  }

  showError(message: string) {
    this.alertSubject.next({ type: 'error', message });
  }

  getAlerts(): Observable<Alert> {
    return this.alertSubject.asObservable();
  }
}

export interface Alert {
  type: 'success' | 'error';
  message: string;
}
