import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { NbPopoverDirective } from '@nebular/theme';
import { async } from 'rxjs/internal/scheduler/async';
import { UpdateSelectedStockComponent } from '../update-selected-stock/update-selected-stock.component';


@Component({
  selector: 'ngx-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit {
  id
  materialName
  public data = []
  filterQuery = '';
  sortBy = '';
  sortOrder = 'asc';
  selectQueryString = '';
  selectQuery = '';

  public socketInstance;
  public loading = true;

  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild("search", {static: false}) nameField: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService
  ) {
    this.socketInstance = sgs.ResponseSocket('delete_selected_stock').subscribe( emitted => {
      this.get_stock_by_id();
    });
    this.socketInstance = sgs.ResponseSocket('update_selected_stock').subscribe( emitted => {
      this.get_stock_by_id();
    });
   }

  ngOnInit() {

   this.get_stock_by_id()

  }
  closeModal(){
    this.activeModal.close()
  }
  selectFilter(name, value){
    this.selectQuery = name;
    this.selectQueryString = value;
    this.popover.hide();
    setTimeout(() => this.nameField.nativeElement.focus(), 0);
    this.filterQuery = "";
  }


  get_stock_by_id(){

    this.sgs.request('get', 'stock/get_stock_by_id', {id : this.id}, async(res) => {

      if(res.success){
        this.data = res.data[0].stocks
        this.loading = false
      }
      else {
        this.data =[]
        this.loading = false

      }
    })
  }

  delete(id){

    this.sgs.Modal({
      header : `System Message`,
      content :  `Are you sure you want to delete this Stocks ?`,
      type :'confirmation',
      buttonName: 'close'
    },{size : 'sm'})
    .confirm.subscribe( response => {
      if(response){
        this.sgs.request('put', 'stock/delete_selected_stock', {id : id}, async(res) => {
          if(res.success){
            this.sgs.showToaster('success', 'Stocks successfully deleted.', 'Success', 2000, 'bottom-right');

          }
        })

      }
    })
  }
  update(data){
    this.sgs.Modal(
      {data},
      {component : UpdateSelectedStockComponent, size : 'lg'}
    )  }
}
