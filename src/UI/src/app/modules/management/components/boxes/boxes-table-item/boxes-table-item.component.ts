import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Box } from '../../../models/box';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: '[boxes-table-item]',
  standalone: true,
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './boxes-table-item.component.html',
  styleUrls: ['./boxes-table-item.component.scss']
})
export class BoxesTableItemComponent {
  @Input() inventory = <Box>{};


constructor(private router: Router) {}

  editBox(boxId: number) {
    this.router.navigate(['/management/boxes', boxId]);
  }
}