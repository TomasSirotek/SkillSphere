import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, Type, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfig, DialogService } from '@ngneat/dialog';
import { BoxesModalComponent } from '../boxes-modal/boxes-modal.component';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { Box } from '../../../models/box';
import { BoxServiceService } from '../../../services/box-service.service';
import { State } from 'src/app/shared/state';
import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { ModalServiceService } from 'src/app/shared/service/modal-service.service';

interface PostBoxDto{
  title: string,
  type: string,
  image: string,
  status: string,
  price: number,
  color: string,
  description: string
}
@Component({
  selector: 'app-boxes-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boxes-header.component.html',
  styleUrls: ['./boxes-header.component.scss'],
  
})


export class BoxesHeaderComponent implements OnInit {
  @Output() dataEmitter = new EventEmitter<any>();



  constructor(private fb: UntypedFormBuilder,private state: State,private modalService: ModalServiceService) {
  }



  openModal() {
    this.modalService.openModal();
    
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
    description: ''
  }


  

  
  
  ngOnInit() {
    
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


