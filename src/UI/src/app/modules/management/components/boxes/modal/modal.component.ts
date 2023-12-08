import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../services/course-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/service/auth.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'New course';
  @Input() message: string = 'Are you sure you want to delete this item?';

  @Output() confirmed = new EventEmitter<string>();
  @Output() canceled = new EventEmitter<void>();

  courseTitle: string;

  constructor(private courseService: CourseService,private router: Router,private authService: AuthService) {
    // subscribe to courses create new course to the api and send it there 
 
 
  }

  confirm() {
    this.confirmed.emit(this.courseTitle);

    this.courseService.createCourse(this.courseTitle,this.authService.getUserId()).subscribe((courseId: string) => {
      this.router.navigate([`/dashboard/my-courses/${courseId}`]);
      this.canceled.emit();
    })

  }

  cancel() {
    this.canceled.emit();
  }

}
