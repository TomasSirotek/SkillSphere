import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TeachingComponent } from './pages/teaching/teaching.component';
import { CoursesDetailComponent } from './pages/user-courses/courses-detail-component';
import { AuthGuard } from 'src/app/core/auth/service/auth-guard';

// /dashboard => DashboardComponent
// the dahsboard not following is still kinky might fix later
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'my-courses',
    component: TeachingComponent,
  },
  {
    path: 'my-courses/:id',
    component: CoursesDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }