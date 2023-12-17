import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, finalize, firstValueFrom, map, of, tap } from 'rxjs';
import { Box, ResponseDto } from '../models/box';
import { State } from 'src/app/shared/state';
import { AlertServiceService } from 'src/app/shared/service/alert-service.service';
import { ToastrService } from 'ngx-toastr';
import { Categories, Course } from '../models/course';
import { PostCourseDraftDto } from './dto/PostCourseDraftDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class CourseService {
  


  public getPaginatedCourses(pageNumber: number, pageSize: number, sortBy: string, sortDir: string) {
    const url = environment.baseUrl + "/courses/paginated";

    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortOrder', sortDir);
  
    return this._http.get<Course[]>(url, { params });
}

   

  constructor(private _http: HttpClient,private toastr: ToastrService) {
  }


  public getOwnedCourses(userId: string) {
    return this._http.get<Course[]>(`${environment.baseUrl}/courses/${userId}/owned`);
  }

  public getAllCourses() {
    return this._http.get<Course[]>(`${environment.baseUrl}/courses`);
  }

  public getCourseByUserId(courseId: string) {
    return this._http.get<Course[]>(`${environment.baseUrl}/courses/${courseId}`);
  }


  public getWishList(userId: string) {
    return this._http.get<Course[]>(`${environment.baseUrl}/courses/${userId}/wishlist`);
  }


  public createCourse(courseTitle: string,userId: string): Observable<string> {
    return this._http.post<any>(`${environment.baseUrl}/courses`, { title: courseTitle,userId: userId }).pipe(
      map(response => response),
      catchError(error => {
        // Handle the error as needed, e.g., log it or show a notification
        console.error('Error creating course:', error);
        // You can rethrow the error or return a default value
        throw error;
      })
    );
  }

  public addCourseToWishlist(courseId: string,userId: string) {
    return this._http.post<any>(`${environment.baseUrl}/courses/wishlist`, { courseId: courseId,userId: userId }).pipe(
      catchError(error => {

        if (error.status === 404) {
          // Return a different status code (e.g., 204 for no content)
          return of({ status: 204, message: 'Course not found' });
        } else {
          throw error;
        }
      })
  
    );
  }

  public removeCourseFromWishlist(courseId: string,userId: string) {
    return this._http.delete<any>(`${environment.baseUrl}/courses/${userId}/wishlist/${courseId}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          // Return a different status code (e.g., 204 for no content)
          return of({ status: 204, message: 'Course not found' });
        } else {
          throw error;
        }
      })
    );
  }

  public saveCourseDraft(courseId: string,postCourseDto: PostCourseDraftDto): Observable<any> {
   
    const url = `${environment.baseUrl}/courses/${courseId}`;

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
    const url = `${environment.baseUrl}/courses/${courseId}/publish`;
    
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
    return this._http.get<Categories[]>(`${environment.baseUrl}/categories`);
  }

  // return 
  


  public getUserCourses(userId: string) {
  
   return this._http.get<Categories[]>(`${environment.baseUrl}/courses/${userId}/created`);
  }


}
