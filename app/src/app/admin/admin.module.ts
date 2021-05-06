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
];

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users/users.component';
import { LogoutComponent } from './modals/logout/logout.component';
import { UserService } from '../services/users.service';
import { AddUserComponent } from './modals/add-user/add-user.component';
import { ConfimationComponent } from './modals/confimation/confimation.component';
import { UpdateUserComponent } from './modals/update-user/update-user.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AddRoomComponent } from './modals/add-room/add-room.component';
import { UpdateRoomComponent } from './modals/update-room/update-room.component';
import { RoomInventoryComponent } from './room-inventory/room-inventory.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AddInventoryComponent } from './modals/add-inventory/add-inventory.component';
import { AddCategoryComponent } from './modals/add-category/add-category.component';
import { EditCategoryComponent } from './modals/edit-category/edit-category.component';

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
    DashboardComponent,
    UsersComponent,
    LogoutComponent,
    AddUserComponent,
    AddRoomComponent,
    ConfimationComponent,
    UpdateUserComponent,
    UpdateRoomComponent,
    RoomsComponent,
    RoomInventoryComponent,
    InventoryComponent,
    AddInventoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,



  ],

  entryComponents: [
    LogoutComponent,
    AddUserComponent,
    AddRoomComponent,
    UpdateUserComponent,
    UpdateRoomComponent,
    ConfimationComponent,
    AddInventoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
  ],
  providers: [UserService],
  exports: [RouterModule]
})
export class AdminModule { }
