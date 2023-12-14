import { NgModule } from '@angular/core';
import { ManagementRoutingModule } from './management-routing.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CourseService } from './services/course-service.service';
import { DialogService ,DialogRef} from '@ngneat/dialog';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthInterceptor } from 'src/app/core/auth/interceptors/auth.interceptor';
import { UserService } from 'src/app/core/auth/service/user.service';

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
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
    },
    UserService,
    CourseService,
    DialogService,
  ],
})
export class ManagementModule { }
