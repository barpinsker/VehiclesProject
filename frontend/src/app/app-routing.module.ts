import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopVehiclesComponent } from './desktop-vehicles/desktop-vehicles.component';

const routes: Routes = [
  { path: '', redirectTo: '/desktop', pathMatch: 'full' },
  { path: 'desktop', component: DesktopVehiclesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
