import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { SvgIconComponent, provideAngularSvgIcon } from 'angular-svg-icon';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [LayoutRoutingModule, HttpClientModule,  NgxSmartModalModule.forRoot(), ToastrModule.forRoot()],
})
export class LayoutModule {}
 