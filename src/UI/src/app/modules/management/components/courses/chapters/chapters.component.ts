// chapters-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chapters-list',
  template: `
    <div class="space-y-4 mt-4">
      <div *ngFor="let chapter of items" class="border p-2 flex items-center justify-between">
        <span>{{ chapter.title }}</span>
        <div>
          <button>Edit</button>
          <!-- Add delete button or functionality as needed -->
        </div>
      </div>
    </div>
  `,
})
export class ChaptersListComponent {
  @Input() items: any[] = [];
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();

}
