/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component } from '@angular/core';

import { ToasterService } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
// import { SharedGlobalService } from './@core/services/shared.global.service';

@Component({
  selector: 'ngx-app',
  template: `
    <!-- <div class="server-offline" *ngIf="!sgs.server.status && sgs.Lan().status" style="	position: absolute;background-color: #1729a5;width: 100%;text-align: center;color: #fff;z-index: 9999999;">
    <i class="fas fa-circle-notch fa-spin" style="opacity:.75; margin-right:10px"></i>Reconnecting &nbsp;&mdash;&nbsp; Server is Offline
    </div>
    <div class="server-offline" *ngIf="!sgs.Lan().status">
      <i class="fas fa-exclamation-circle"  style="opacity:.75; margin-right:10px"></i>No Internet Connection
    </div> -->
    <!-- <toaster-container [toasterconfig]="sgs.ToasterInit(toast)"></toaster-container> -->
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  public socketInstance;

  constructor(
    // public sgs: SharedGlobalService,
    public toast: ToasterService,
  ) {
    // this.socketInstance = this.sgs.ResponseSocket('serverStatus').subscribe();
  }

  ngOnDestroy() { this.socketInstance.unsubscribe(); }
}
