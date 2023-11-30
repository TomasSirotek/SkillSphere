import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from 'src/app/modules/management/models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/modules/management/services/course-service.service';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';

@Component({
  selector: 'app-user-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.scss',
})
export class UserCoursesComponent implements OnInit {
  userCourses: Course[];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  goToDetailPage(courseId: string) {
    this.router.navigate([courseId], { relativeTo: this.route });
  }



  ngOnInit(): void {
    this.courseService
      .getUserCourses(this.authService.getUserId())
      .subscribe((data: any) => {
        this.userCourses = data.courses.map((course) => {

          // coverImageRelativePath is null, use the default image
          course.coverImageRelativePath =
            course.coverImageRelativePath ||
            'https://s.udemycdn.com/course/200_H/placeholder.jpg';
          return course;
        });

      });
  }
}
