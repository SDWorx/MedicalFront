import { DeviceipComponent } from './pages/deviceip/deviceip.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ViewclaimComponent } from './pages/viewclaim/viewclaim.component';
import { MessengerComponent } from './pages/messenger/messenger.component';
import { HrComponent } from './pages/hr/hr.component';
import { AuthGuardGuard } from './services/auth/auth-guard.guard';
import { AuthGuard } from './services/auth/auth.guard';

import { ViewstatusComponent } from './pages/viewstatus/viewstatus.component';

import {ConfigComponent} from './pages/config/config.component'
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'claimForm',
    component: EmployeeComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedUser: 'employee'
    } 
  },
  {
    path: 'viewClaim',
    component: ViewclaimComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedAdmin: 'admin'
    } 
  },
  {
    path: 'viewstatus',
    component: ViewstatusComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedAdmin: 'admin'
    } 
  },
  {
    path: 'messenger',
    component: MessengerComponent,
    canActivate: [AuthGuard],
    data: { 
      expectedAdmin: 'admin'
    }  
  },
  // { path: 'hr', component: HrComponent, canActivate: [AuthGuard] },
  { path: 'hr', component: HrComponent, },
  { 
    path: 'config', 
    component: ConfigComponent,
    data: { 
      expectedAdmin: 'admin'
    } 
  },
  {
    path: 'ipconfig/add/:id',
    component: EditComponent,
    data: { 
      expectedAdmin: 'admin'
    } 
    },
  {
  path: 'ipconfig/edit/:id',
  component: EditComponent,
  data: { 
    expectedAdmin: 'admin'
  } 
},
{
  path: 'ipconfig/edit/:id/:ipAddress',
  component: EditComponent,
  data: { 
    expectedAdmin: 'admin'
  } 
},

  {
    path: 'ip',
    component: DeviceipComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
