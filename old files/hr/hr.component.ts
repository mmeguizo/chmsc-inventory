import { Component } from '@angular/core';

import { MENU_ITEMS } from './hr-menu';

@Component({
  selector: 'hr-pages',
  template: `
    <ngx-one-column-layout>
        <nb-menu [items]="menu"></nb-menu>
        <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class HrComponent {

  menu = MENU_ITEMS;
}
