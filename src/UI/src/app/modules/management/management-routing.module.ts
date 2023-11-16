import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxesComponent } from './pages/boxes/boxes.component';
import { ManagementComponent } from './management.component';
import { BoxDetailComponent } from './pages/box-detail/box-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
        { path: 'boxes', component: BoxesComponent },
        { path: 'boxes/:id', component: BoxDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule { }