import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, firstValueFrom, map } from 'rxjs';
import { State } from 'src/app/shared/state';
import { AlertServiceService } from 'src/app/shared/service/alert-service.service';
import { ToastrService } from 'ngx-toastr';
import { DashboardData, ResponseDto } from '../models/DashboardData';


@Injectable({
  providedIn: 'root'
})


export class DashboardServiceService {

  constructor(private http: HttpClient,private state : State,private toastr: ToastrService) {
  }

  
}
