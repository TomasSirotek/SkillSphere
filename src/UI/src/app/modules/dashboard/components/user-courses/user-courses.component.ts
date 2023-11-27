import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from 'src/app/modules/management/models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/modules/management/services/course-service.service';

@Component({
  selector: 'app-user-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.scss',
})
export class UserCoursesComponent implements OnInit {
  userCourses: Course[];

  @Output() coursesLengthChange = new EventEmitter<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  goToDetailPage(courseId: string) {
    this.router.navigate([courseId], { relativeTo: this.route });
  }

  private emitCoursesLength(): void {
    this.coursesLengthChange.emit(this.userCourses?.length);
  }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((data: any) => {
      this.userCourses = data.courses;
      this.emitCoursesLength();
    });
  }
}
