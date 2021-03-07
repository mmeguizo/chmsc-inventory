import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { async } from '@angular/core/testing';
import { NbPopoverDirective } from '@nebular/theme';
@Component({
  selector: 'ngx-add-request-stock',
  templateUrl: './add-request-stock.component.html',
  styleUrls: ['./add-request-stock.component.scss']
})
export class AddRequestStockComponent implements OnInit {
  public data = []
  public request : any
  filterQuery = '';
  sortBy = 'invoice';
  sortOrder = 'asc';
  selectQueryString = 'Lot number';
  selectQuery = 'lot';

  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild("search", {static: false}) nameField: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService
  ) {

   }

   selectFilter(name, value){
    this.selectQuery = name;
    this.selectQueryString = value;
    this.popover.hide();
    setTimeout(() => this.nameField.nativeElement.focus(), 0);
    this.filterQuery = "";
  }

  ngOnInit(): void {
    this.initRequest()
  }


  closeModal(){
    this.activeModal.close()
  }

  initRequest(){
    this.request = {
      id : 0,
      truckName : ''
    }
  }



  select_truck(){
    this.sgs.request('get', 'truck/getAllVehicles', null, async(res) => {
      if(res.success){
        selector(res.data)
      }
      else {
        selector([])
      }

    })

    let selector = (data) => {
      this.sgs.Modal({
      header: `Select Material`,
      content : {
        type : 'array-object',
        data : data,
        display : [
          {property: 'id', nicename : "#"},
          {property: 'truckModel', nicename : "Truck Model"},
          {property: 'truckType', nicename : "Truck Type"},
          {property: 'plate', nicename : "Truck Plate"},
        ],
        return: ['id','truckModel'],
        search: true,
        searchTo: ['id', 'truckModel', 'truckType', 'plate'],
        sortTo: 'id',
      },
      accept: 'single',
      type: 'selector',

      }, {size: 'lg'})
      .selected.subscribe(response => {
        if(response){
        this.request = {
          id : response.data[0],
          truckName : response.data[1]
        }
        }


      })
    }
  }

  select_materials(){
    this.sgs.request('get','stock/all_stocks', null , async(res) => {

      if(res.success){
        selector(res.data)
      }
      else {
        selector([])
      }

    })
    let selector = (data) => {
      this.sgs.Modal({
      header: `Select Material`,
      content : {
        type : 'array-object',
        data : data,
        display : [
          {property: 'id', nicename : "#"},
          {property: 'material_name', nicename : "Material Name"},
          {property: 'added_by', nicename : "Added By"},
          {property: 'date', nicename : "Date Added"},
        ],
        return: ['id','material_name','stock_id'],
        search: true,
        searchTo: ['id', 'material_name', 'added_by', 'date'],
        sortTo: 'id',
      },
      accept: 'multiple',
      type: 'selector',

      }, {size: 'lg'})
      .selected.subscribe(response => {
        if(response){

         this.data = response.data
         this.data.map(e =>{
           e.qty = null
           return e
         })
        }


      })
    }
  }

  save(){
    this.sgs.request('post', 'request/add_request', {
      truckName: this.request.id,
      value : this.data
    }, async(res) => {
      if(res.success){
        this.sgs.showToaster('success', 'Request sent.','Success', 2000, 'bottom-right')
        this.closeModal()
      }

    })

  }
}
