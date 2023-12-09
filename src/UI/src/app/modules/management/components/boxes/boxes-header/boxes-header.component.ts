import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfig, DialogService } from '@ngneat/dialog';
import { BoxesModalComponent } from '../boxes-modal/boxes-modal.component';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
} from '@angular/forms';
import { Box } from '../../../models/box';
import { CourseService } from '../../../services/course-service.service';
import { State } from 'src/app/shared/state';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { ModalServiceService } from 'src/app/shared/service/modal-service.service';
import { Subscription } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ModalComponent } from '../modal/modal.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlusSmall } from '@ng-icons/heroicons/outline';

interface PageSizes {
  value: number;
}

 export enum OrderByType {
  ASC = 'ASC',
  DESC = 'DESC',
}

@Component({
  selector: 'app-boxes-header',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule, NgIcon],
  templateUrl: './boxes-header.component.html',
  styleUrls: ['./boxes-header.component.scss'],
  viewProviders: [provideIcons({ heroPlusSmall })],
})
export class BoxesHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() isDetail: boolean = true;
  @ViewChild('template', { static: true })
  @Output()
  dataEmitter = new EventEmitter<any>();
  @Output() searchTermEmitter = new EventEmitter<string>();

  @Output() pageEmitter = new EventEmitter<boolean>();
  @Output() pageSizeEmmiter = new EventEmitter<number>();
  @Output() orderByEmitter = new EventEmitter<OrderByType>();

  @Input() totalPages: number;

  @Input() showButton: boolean;
  @Input() showFilter: boolean;

  private dialog = inject(DialogService);

  selectedOption: any;
  pageSizes: PageSizes[] = [
    { value: 8 },
    { value: 16 },
    { value: 24 },
    { value: 48 },
  ];

  currentPage: number = 1;

  private modalSubscription: Subscription;
  modal: ModalInterface;
  formGroup: FormGroup;
  searchTerm: string;
  selectedSearchTerm: string = "Filter by";
  orderBy: OrderByType;

  constructor(
    private fb: UntypedFormBuilder,
    private state: State,
    private modalService: ModalServiceService
  ) {}

  changePage(page: number): void {
    // You can perform actions when the page changes, for example, fetching data for the new page
    this.currentPage = page;
    // Fetch data for the new page using the page variable
    // ...
  }

  setupModal() {
    const $modalElement: HTMLElement = document.querySelector('#modalCreate');

    const modalOptions: ModalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses:
        'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {},
      onShow: () => {},
      onToggle: () => {},
    };

    this.modal = new Modal($modalElement, modalOptions);
  }

  openModal() {
    this.setupModal();
    this.modal.show();

  }

  ngOnInit() {
    // this.dataEmitter.emit(this.showButton);
    this.selectedOption = this.pageSizes[0].value;
    this.orderBy = OrderByType.ASC;
  }

  handleCancleModal() {
    this.modal.hide();
  }

  // EMIITERS FOR FILTERING,SORTING

  // emit of filter by term
  onSortChange(sortTerm: string) {
    this.searchTerm = sortTerm;
    this.selectedSearchTerm = sortTerm;
    // emit the value to the parent component
    this.searchTermEmitter.emit(sortTerm);

    // set the dropdown to hidden after selection 
    const dropdownDom = document.getElementById('dropdown');
    // set hidden 
    dropdownDom.classList.add('hidden');
  }

  navigateToPage(isNavigateForward: boolean) {

    if(isNavigateForward && this.currentPage < this.totalPages){
      this.currentPage++;
    } else if(!isNavigateForward && this.currentPage > 1){
      this.currentPage--;
    }else {
      return;
    }
    this.pageEmitter.emit(isNavigateForward);
  }

  onPageSizeChange() {
    if (this.selectedOption) {
      this.currentPage = 1;
      this.pageSizeEmmiter.emit(this.selectedOption);
    }
  }

  onOrderByChange() {
    // if order by is asc set it to desc and vice versa
    const orderBy = this.orderBy === OrderByType.ASC ? OrderByType.DESC : OrderByType.ASC;

    this.orderBy = orderBy;
    this.orderByEmitter.emit(this.orderBy)
  }
}
