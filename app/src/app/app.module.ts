/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { APP_BASE_HREF } from '@angular/common';
// import { SharedGlobalService, GlobalModal } from './@core/services/shared.global.service';
import { ConnectionService } from './@core/services/connection.service';

// import { AuthService } from './@core/services/auth.service';
// import { UserGlobalService } from './@core/services/user.global.service';
// import { HttpModule } from '@angular/http';
import { AuthGuard } from './guard/auth.guard';
import { NotAuthGuard } from './guard/notAuth.guard';
import { ToasterModule } from 'angular2-toaster';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
// import { HrModule } from './hr/hr.module';
// import { EmployeeModule } from './employee/employee.module';
import { JwtModule } from "@auth0/angular-jwt";
import { ToastrModule } from 'ngx-toastr';
import { TimeagoModule, TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter, TimeagoClock } from 'ngx-timeago';

import { NbIconLibraries } from '@nebular/theme';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { UserService } from './services/users.service';
// import { DashboardComponent } from './main/dashboard/dashboard/dashboard.component';

// export class MyIntl extends TimeagoIntl {
//   // do extra stuff here...
// }


export function tokenGetter() {
  return localStorage.getItem("token");
}



@NgModule({
  declarations: [
    AppComponent,
    //DashboardComponent,
    // GlobalModal
  ],
  imports: [

    HttpClientModule,
    AppRoutingModule,
    // HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    NgbModule,
    //NgbActiveModal,
    SharedModule,
    AdminModule,
    // HrModule,
    // EmployeeModule,
    TimeagoModule.forRoot(
      // {intl: { provide: TimeagoIntl, MyIntl },
      {
        intl: { provide: TimeagoIntl },
        formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
      }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // allowedDomains: ['localhost:3000'],
        // disallowedRoutes: ["http://localhost:3000/authentication/login"],
      },
    }),
  ],
  entryComponents: [
    // GlobalModal

  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
    NotAuthGuard,
    UserService,
    // AuthService,
    // UserGlobalService,
    // SharedGlobalService,
    ConnectionService,
    //NgbActiveModal,
  ],
})




export class AppModule {

  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
    this.iconLibraries.setDefaultPack('font-awesome'); // <---- set as default
  }

}
