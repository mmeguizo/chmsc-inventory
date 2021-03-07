import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';

import { NbPopoverDirective } from '@nebular/theme';

import { UpdateSelectedRequestComponent } from '../update-selected-request/update-selected-request.component';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'ngx-update-request-stock',
  templateUrl: './update-request-stock.component.html',
  styleUrls: ['./update-request-stock.component.scss']
})
export class UpdateRequestStockComponent implements OnInit {
public id
public data = []
public filterQuery = '';
public sortBy = 'id';
public sortOrder = 'asc';
public selectQueryString = 'Truck ID';
public selectQuery = 'id';

public socketInstance;
public loading = false;

@ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
@ViewChild("search", {static: false}) nameField: ElementRef;

  constructor(
    public sgs: SharedGlobalService,
    public activeModal: NgbActiveModal,

  ) {
    this.socketInstance = sgs.ResponseSocket('update_selected_request').subscribe( emitted => {
      this.get_request_by_id()

    });
    this.socketInstance = sgs.ResponseSocket('delete_selected_request').subscribe( emitted => {
      this.get_request_by_id()

    });
   }

  ngOnInit(): void {
    this.get_request_by_id()
  }
  ngOnDestroy(){
    this.socketInstance.unsubscribe();
  }
  selectFilter(name, value){
    this.selectQuery = name;
    this.selectQueryString = value;
    this.popover.hide();
    setTimeout(() => this.nameField.nativeElement.focus(), 0);
    this.filterQuery = "";
  }
  closeModal(){
    this.activeModal.close()
  }

get_request_by_id(){
  this.sgs.request('get','request/get_request_by_id', {id : this.id}, async(res) => {
    if(res.success){
      this.data = res.data[0].request
    }
    else {
      this.data = []
    }

  })
}


  delete(id){
    this.sgs.Modal({
      header : `System Message`,
      content :  `Are you sure you want to delete this material request?`,
      type :'confirmation',
      buttonName: 'close'
    },{size : 'sm'})
    .confirm.subscribe( response => {
      if(response){
        this.sgs.request('put', 'request/delete_selected_request', {id : id}, async(res) => {
          if(res.success){
            this.sgs.showToaster('success', 'Request successfully deleted.', 'Success', 2000, 'bottom-right');

          }
        })

      }
    })
  }
  update(data){

    this.sgs.Modal(
      {data : data},
      {component :UpdateSelectedRequestComponent, size  : 'md' }
    )
  }
}
