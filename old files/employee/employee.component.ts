import { Component } from '@angular/core';

import { MENU_ITEMS } from './employee-menu';

@Component({
  selector: 'hr-pages',
  template: `
    <ngx-one-column-layout>
        <nb-menu [items]="menu"></nb-menu>
        <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class EmployeeComponent {

  menu = MENU_ITEMS;
}
