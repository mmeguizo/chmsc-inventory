import { Component, OnInit } from '@angular/core';
// import { SharedGlobalService } from '../../../@core/services/shared.global.service';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created by: <b>Mark Oliver Meguizo</b> &#169; 2021
    </span>

    <span class="fright">
      <!-- Version {{ sgs.AppVersion.version }} -->
    <span>
  `,

})
export class FooterComponent implements OnInit {

  constructor(
    // public sgs: SharedGlobalService,
  ) { }

  ngOnInit() {
    // this.sgs.ApplicationVersion();
  }
}
