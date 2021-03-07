import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApproveRequestComponent } from '../../modals/approve-request/approve-request.component';
import { UpdateRequestStockComponent } from '../../modals/update-request-stock/update-request-stock.component';
import { AddRequestStockComponent } from '../../modals/add-request-stock/add-request-stock.component';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
@Component({
  selector: 'ngx-normal-request',
  templateUrl: './normal-request.component.html',
  styleUrls: ['./normal-request.component.scss']
})
export class NormalRequestComponent implements OnInit {
   @Output() passEntry: EventEmitter<number> = new EventEmitter<number>();
 public filterQuery = '';
  public sortBy = 'id';
  public sortOrder = 'asc';
  public selectQueryString = 'Request  ID';
  public selectQuery = 'id';
  public socketInstance;
  public loading = true;
  public data : []

@ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild("search", {static: false}) nameField: ElementRef;
  constructor(
    public sgs: SharedGlobalService,
    public ngbModal: NgbModal
  ) {
      this.socketInstance = sgs.ResponseSocket('newStock').subscribe( emitted => {
      this.get_all_request();
    });
    this.socketInstance = sgs.ResponseSocket('request_delete').subscribe( emitted => {
      this.get_all_request();
    });
    this.socketInstance = sgs.ResponseSocket('delete_selected_request').subscribe( emitted => {
      this.get_all_request()

    });
    this.socketInstance = sgs.ResponseSocket('confirm_request').subscribe( emitted => {
      this.get_all_request()

    });
   }

  ngOnInit(): void {

    this.get_all_request()

  }

  selectFilter(name, value){
    this.selectQuery = name;
    this.selectQueryString = value;
    this.popover.hide();
    setTimeout(() => this.nameField.nativeElement.focus(), 0);
    this.filterQuery = "";
}

add_request(){
    this.sgs.Modal(
      {},
      {component : AddRequestStockComponent, size : 'lg'}
    )
  }


  delete(id){
    this.sgs.Modal({
      header : `System Message`,
      content :  `Are you sure you want to delete this Request ?`,
      type :'confirmation',
      buttonName: 'close'
    },{size : 'sm'})
    .confirm.subscribe(response => {
      if(response){
        this.sgs.request('put', 'request/delete_request', {id : id}, async(res) => {
          if(res.success){
            this.sgs.showToaster('success', 'Request successfully deleted.', 'Success', 2000, 'bottom-right');

          }

        })
      }
    })
  }

  update(id){
    this.sgs.Modal(
      {id: id},
      {component : UpdateRequestStockComponent, size: 'xl'}
    )

  }

  approve(id){
    this.sgs.Modal(
      {id},
      {component : ApproveRequestComponent, size: 'xl'}
    )
  }

   get_all_request(){
    this.sgs.request('get', 'request/get_all_request', null , async(res) => {
     this.loading = false
      if(res.success){
        this.data = res.data
        this.passEntry.emit(this.data.length)
      }
      else {
        this.passEntry.emit(0)
        this.data = []
      }

    })
  }
}
