import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { NormalUserGuard } from '../guards/normal-user.guard';
import { LoginComponent } from '../login/login.component';
import { NewUserComponent } from '../new-user/new-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [ NormalUserGuard ]  },
  { path: 'newuser', component: NewUserComponent, canActivate: [ AuthGuard ]  },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(
    routes,
    // { enableTracing: true } // <-- debugging purposes only
  ), ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
