import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, firstValueFrom, map } from 'rxjs';
import { Box, ResponseDto } from '../models/box';
import { State } from 'src/app/shared/state';
import { AlertServiceService } from 'src/app/shared/service/alert-service.service';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})


export class CourseService {
  

  public coursesState: Observable<Course[]>;
  private _coursesState = new BehaviorSubject<Course[]>([]);

  constructor(private _http: HttpClient,private toastr: ToastrService) {
    this.coursesState = this._coursesState.asObservable();
    this.loadCourses();
  }

  private loadCourses() {
    // Assume you have an API endpoint to fetch courses
    this._http.get<Course[]>('https://localhost:5001/api/courses').subscribe((courses) => {
      this._coursesState.next(courses);
    });
  }

  // Example function to update the courses
  public updateCourses(updatedCourses: Course[]) {
    this._coursesState.next(updatedCourses);
  }
  // get all courses
  public getAllCourses(): Observable<Course[]> {
    return this.coursesState;
  }



  // get user courses if any

  // get course by id 

  // create course

  // update course

  // delete course


  // get all categories 
  public getAllCategories(): Observable<any> {
    return this._http.get<any>('https://localhost:5001/api/categories');
  }


}
