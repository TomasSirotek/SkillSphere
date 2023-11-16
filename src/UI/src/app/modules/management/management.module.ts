import { NgModule } from '@angular/core';
import { ManagementRoutingModule } from './management-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BoxServiceService } from './services/box-service.service';
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
    HttpClient, // Ensure HttpClient is provided
    BoxServiceService, // Your service
    DialogService,
  ],
})
export class ManagementModule { }
