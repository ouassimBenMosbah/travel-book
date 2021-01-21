import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelAddComponent } from './travel-add/travel-add.component';
import { TravelDetailsComponent } from './travel-details/travel-details.component';
import { TravelEditComponent } from './travel-edit/travel-edit.component';
import { TravelListComponent } from './travel-list/travel-list.component';

const routes: Routes = [
  {path: 'list', component: TravelListComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'details/:id', component: TravelDetailsComponent},
  {path: 'add', component: TravelAddComponent},
  {path: 'edit/:id', component: TravelEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
