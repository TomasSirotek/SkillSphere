import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, firstValueFrom, map } from 'rxjs';
import { Box, ResponseDto } from '../models/box';
import { State } from 'src/app/shared/state';
import { AlertServiceService } from 'src/app/shared/service/alert-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})


export class BoxServiceService {
  
  constructor(private http: HttpClient,private state : State,private alertService: AlertServiceService,private toastr: ToastrService) {
  }



}
