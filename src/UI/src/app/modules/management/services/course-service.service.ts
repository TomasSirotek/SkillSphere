import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, finalize, firstValueFrom, map, tap } from 'rxjs';
import { Box, ResponseDto } from '../models/box';
import { State } from 'src/app/shared/state';
import { AlertServiceService } from 'src/app/shared/service/alert-service.service';
import { ToastrService } from 'ngx-toastr';
import { Categories, Course } from '../models/course';
import { PostCourseDraftDto } from './dto/PostCourseDraftDto';

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

  public createCourse(courseTitle: string,userId: string): Observable<string> {
    return this._http.post<any>('https://localhost:5001/api/courses', { title: courseTitle,userId: userId }).pipe(
      map(response => response),
      catchError(error => {
        // Handle the error as needed, e.g., log it or show a notification
        console.error('Error creating course:', error);
        // You can rethrow the error or return a default value
        throw error;
      })
    );
  }

  public saveCourseDraft(courseId: string,postCourseDto: PostCourseDraftDto): Observable<any> {
   
    const url = `https://localhost:5001/api/courses/${courseId}`;

    const command = {
      id: postCourseDto.id,
      title: postCourseDto.title,
      description: postCourseDto.description,
      coverImageRelativePath: postCourseDto.coverImageRelativePath,
      price: postCourseDto.price,
      isPublished: postCourseDto.isPublished,
      categories: postCourseDto.categories,
      chapters: postCourseDto.chapters
    };

    return this._http.put<any>(url, command).pipe(
      tap(() => {
        // Display an info toast when the request is being processed
        this.toastr.info('Saving course...'); 
      }),
      finalize(() => {
        // Hide the info toast when the request is done (whether successful or with an error)
        this.toastr.clear();
        this.toastr.success('Course saved successfully!');
      }),
      catchError(error => {
        // Handle the error as needed, e.g., log it or show a notification
        this.toastr.error(error);
        throw error;
      })
    );
  }

  public publishCourse(courseId: string, isPublished: boolean) {
    const url = `https://localhost:5001/api/courses/${courseId}/publish`;
    
    return this._http.put<any>(url, {courseId:courseId, isPublished: isPublished }).pipe(
      map(response => response),
      tap(() => {
        // Display an info toast when the request is being processed
        this.toastr.info(isPublished ? 'Publishing course...' : 'Unpublishing course...'); 
      }),
      finalize(() => {
        // Hide the info toast when the request is done (whether successful or with an error)
        this.toastr.clear();
        this.toastr.success(isPublished ? 'Course published' : 'Course unpublished'); 

      }),
      catchError(error => {
        this.toastr.error(error);
        throw error;
      })
    );

  }

  // get all categories 
  public getAllCategories(): Observable<Categories[]> {
    return this._http.get<Categories[]>('https://localhost:5001/api/categories');
  }

  public getUserCourses(userId: string): Observable<Course[]> {

    const url = `https://localhost:5001/api/courses/${userId}`;
  
    return this._http.get<Course[]>(url).pipe(
      map((courses) => {
        return courses;
      })
    );
  }


}
