import { NgModule } from '@angular/core';
import { ManagementRoutingModule } from './management-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CourseService } from './services/course-service.service';
import { DialogService ,DialogRef} from '@ngneat/dialog';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    ManagementRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
  ],
  providers: [
    {
      provide: DialogRef,
      useValue: {}
    },
    HttpClient, 
    CourseService,
    DialogService,
  ],
})
export class ManagementModule { }
