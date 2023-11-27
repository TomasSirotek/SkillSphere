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

interface PostBoxDto {
  title: string;
  type: string;
  image: string;
  status: string;
  price: number;
  color: string;
  description: string;
}
@Component({
  selector: 'app-boxes-header',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './boxes-header.component.html',
  styleUrls: ['./boxes-header.component.scss'],
})
export class BoxesHeaderComponent implements OnInit {


  @Output() dataEmitter = new EventEmitter<any>();
  @Input() showButton: boolean;

  private modalSubscription: Subscription;
  modal: ModalInterface;
  formGroup: FormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private state: State,
    private modalService: ModalServiceService
  ) {}

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



  private dialog = inject(DialogService);

  @Input() title: string;
  @Input() subTitle: string;
  @Input() isDetail: boolean = true;
  @ViewChild('template', { static: true })
  messageFromDialog: string;
  dataFromDialog: PostBoxDto;

  postDataDto: PostBoxDto = {
    title: '',
    type: '',
    image: '',
    status: '',
    price: 0,
    color: '',
    description: '',
  };

  ngOnInit() {
    this.dataEmitter.emit(this.showButton);
  }

  handleCancleModal() {
    this.modal.hide();
    }

 

  //   createBoxAsync(data: PostBoxDto) {
  //     // creat ebox and get all boxes
  //     this.boxService.createBox(data).then(() => {
  //       this.boxService.getBoxes().then(() => {
  //         this.state.boxes = this.state.boxes;
  //       });
  //     });
  // }
}
