import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';

const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'userList',
    pathMatch: 'full',
  },
  {
    path: 'userList',
    component: UserlistComponent,
  },
  // Add more user-related routes as needed
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
