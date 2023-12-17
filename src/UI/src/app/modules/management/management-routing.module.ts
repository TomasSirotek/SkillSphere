import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './pages/user-courses/courses.component';
import { ManagementComponent } from './management.component';
import { AuthGuard } from 'src/app/core/auth/service/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule { }