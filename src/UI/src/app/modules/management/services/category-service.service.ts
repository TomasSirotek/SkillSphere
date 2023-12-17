import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, firstValueFrom, map } from 'rxjs';
import { Box, ResponseDto } from '../models/box';
import { State } from 'src/app/shared/state';
import { AlertServiceService } from 'src/app/shared/service/alert-service.service';
import { ToastrService } from 'ngx-toastr';
import { Categories, Course } from '../models/course';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class CategoryService {
  public categoriesState: Observable<Categories[]>;
  private _categoriesState = new BehaviorSubject<Categories[]>([]);

  constructor(private _http: HttpClient,private toastr: ToastrService) {
    this.categoriesState = this._categoriesState.asObservable();
    this.loadCategories();
  }

  private loadCategories() {
    // Assume you have an API endpoint to fetch courses
    this._http.get<Categories[]>(`${environment.baseUrl}categories`).subscribe((categories) => {
      this._categoriesState.next(categories);
    });
  }

  // get all courses
  public getAllCategories(): Observable<Categories[]> {
    return this.categoriesState;
  }



  // get user courses if any

  // get course by id 

  // create course

  // update course

  // delete course


}
