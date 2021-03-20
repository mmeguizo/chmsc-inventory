import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users/users.component';
import { RoomsComponent } from './rooms/rooms.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'rooms',
        component: RoomsComponent,
      },
      {
        path: 'inventory',
        component: InventoryComponent,
      },

    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
