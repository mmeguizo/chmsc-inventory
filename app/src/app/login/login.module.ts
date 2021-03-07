import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.modules';
import { LoginComponent } from './login.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbSpinnerModule } from '@nebular/theme';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { NbLayoutModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './modals/test/test.component';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    LoginRoutingModule,
    NbSpinnerModule,
    NbCardModule,
    NbLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    ToasterModule.forChild()

  ],
  declarations: [LoginComponent, TestComponent],
  entryComponents: [
    TestComponent
  ]
})
export class LoginModule { }
