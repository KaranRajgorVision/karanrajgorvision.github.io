import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { confirmationAuthRouteGuard } from 'src/app/services/account/confirmation-auth-route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'confirmation',
    pathMatch: 'full'
  },
  {
    canActivate:[confirmationAuthRouteGuard],
    path: 'confirmation',
    component: ConfirmationComponent
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
