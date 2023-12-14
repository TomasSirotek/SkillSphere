import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from 'src/app/core/auth/service/auth-guard';

// looking from perspective comming first and seaing tho pages 
const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'courses', 
    pathMatch: 'full', 
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
 },
  {
    path: 'courses',
    component: LayoutComponent,
    loadChildren: () => import('../management/management.module').then((m) => m.ManagementModule),

  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}