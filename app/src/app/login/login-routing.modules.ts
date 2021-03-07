import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { LoginComponent } from './login.component';
import { NotAuthGuard } from '../guard/notAuth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // canActivate: [NotAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
