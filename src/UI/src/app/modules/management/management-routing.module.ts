import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './pages/user-courses/courses.component';
import { ManagementComponent } from './management.component';
import { CoursesDetailComponent } from './pages/box-detail/courses-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
  {
    path: ':id',
    component: CoursesDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule { }