import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './layout/main/main.component';
import { AdminGuard } from './auth/admin.guard';
import { LoginAuthService } from './services/loginServices/login-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginAuthService]
  },
  {
    path: 'ragistration',
    component: RegisterComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./modules/setting/setting.module').then((m) => m.SettingModule),
      },
    ],
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then((m) => m.AccountModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
