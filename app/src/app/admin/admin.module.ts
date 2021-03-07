import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbCardModule,
  NbBadgeModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
  NbCheckboxModule,
  NbDialogModule,
  NbInputModule,
  NbPopoverModule,
  NbCalendarModule,
  NbTreeGridModule,
  NbDatepickerModule,
  NbAccordionModule,
  // NbAccordionItemBodyComponent,
  // NbAccordionComponent,
  // NbAccordionItemComponent,
  // NbAccordionItemHeaderComponent,
  // NbListModule,
  // NbRouteTabsetModule,
  // NbStepperModule,
} from '@nebular/theme';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ThemeModule } from '../@theme/theme.module';

import { SharedModule } from '../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbCardModule,
  NbBadgeModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
  NbCheckboxModule,
  NbDialogModule,
  NbInputModule,
  NbPopoverModule,
  NbCalendarModule,
  NbTreeGridModule,
  NbAccordionModule,
  // NbAccordionItemBodyComponent,
  // NbAccordionComponent,
  // NbAccordionItemComponent,
  // NbAccordionItemHeaderComponent,
  // NbListModule,
  // NbRouteTabsetModule,
  // NbStepperModule,
];

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users/users.component';
import { LogoutComponent } from './modals/logout/logout.component';
import { UserService } from '../services/users.service';

@NgModule({
  imports: [
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule.forRoot(),
    NbActionsModule,
    NbDatepickerModule,
    BsDropdownModule.forRoot(),
    SharedModule,
    NbAccordionModule,
    ...NB_MODULES,
    RouterModule
  ],
  declarations: [
    AdminComponent,
    // NbAccordionItemBodyComponent,
    // NbAccordionComponent,
    // NbAccordionItemComponent,
    // NbAccordionItemHeaderComponent,
    // NbListModule,
    // NbRouteTabsetModule,
    // NbStepperModule,
    DashboardComponent,
    UsersComponent,
    LogoutComponent],
  entryComponents: [
    LogoutComponent
  ],
  providers: [UserService],
  exports: [RouterModule]
})
export class AdminModule { }
