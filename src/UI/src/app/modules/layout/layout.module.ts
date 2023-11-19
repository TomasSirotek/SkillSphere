import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { SvgIconComponent, provideAngularSvgIcon } from 'angular-svg-icon';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from 'src/app/core/auth/interceptors/auth.interceptor';

@NgModule({
  imports: [LayoutRoutingModule, HttpClientModule,  NgxSmartModalModule.forRoot(), ToastrModule.forRoot()],
  providers: [
    HttpClientModule,
    HttpClient,
    { provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
    }
  ],
})
export class LayoutModule {}
 