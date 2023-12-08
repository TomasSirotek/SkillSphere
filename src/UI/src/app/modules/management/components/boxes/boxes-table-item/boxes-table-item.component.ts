import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Box } from '../../../models/box';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../../models/course';

@Component({
  selector: '[boxes-table-item]',
  standalone: true,
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './boxes-table-item.component.html',
  styleUrls: ['./boxes-table-item.component.scss']
})
export class BoxesTableItemComponent {
  @Input() course = <Course>{};


constructor(private router: Router,    private route: ActivatedRoute,) {}

  editBox(courseId: string) {
    this.router.navigate([courseId], { relativeTo: this.route });
  }
}