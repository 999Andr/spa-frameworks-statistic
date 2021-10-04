import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
export const routes: Routes = [
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) }, 
  { path: '**',  redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
