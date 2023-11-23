import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CoursesDetailComponent } from '../management/pages/box-detail/courses-detail.component';
import { TeachingComponent } from './pages/teaching/teaching.component';

// /dashboard => DashboardComponent
// the dahsboard not following is still kinky might fix later
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
   
  },
  {
    path: 'teaching',
    component: TeachingComponent,
    children: [ 
      {path: 'id', component: CoursesDetailComponent}
      // Later reroute to detail
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }