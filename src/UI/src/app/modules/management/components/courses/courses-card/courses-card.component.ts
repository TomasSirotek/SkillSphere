import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../../models/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-card.component.html',
  styleUrls: ['./courses-card.component.scss']
})
export class CoursesCardComponent {
  @Input() course: Course | undefined;

  constructor(private router: Router,private route: ActivatedRoute) { }

  goToDetailPage(courseId: string) {
    this.router.navigate([courseId], { relativeTo: this.route });
  }
}
