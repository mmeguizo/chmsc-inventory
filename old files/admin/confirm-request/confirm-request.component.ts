import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { async } from 'rxjs/internal/scheduler/async';
@Component({
  selector: 'ngx-confirm-request',
  templateUrl: './confirm-request.component.html',
  styleUrls: ['./confirm-request.component.scss']
})
export class ConfirmRequestComponent implements OnInit {
  public data = [];

  public filterQuery = '';
  public sortBy = 'id';
  public sortOrder = 'asc';
  public selectQueryString = 'Request  ID';
  public selectQuery = 'id';
  public socketInstance;
  public loading = true;

  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild("search", {static: false}) nameField: ElementRef;

  constructor(
    public sgs: SharedGlobalService,
    public ngbModal: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllConfirmRequest()
  }

  getAllConfirmRequest(){
    this.sgs.request('get', 'request/get_all_confirm', null, async(res) => {
      if(res.success){
        this.data = res.data
        this.loading  = false
      }
      else {
        this.data = []
        this.loading  = false

      }

    })
  }

  selectFilter(name, value){
    this.selectQuery = name;
    this.selectQueryString = value;
    this.popover.hide();
    setTimeout(() => this.nameField.nativeElement.focus(), 0);
    this.filterQuery = "";
  }

}
