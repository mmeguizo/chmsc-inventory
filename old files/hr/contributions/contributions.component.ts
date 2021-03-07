import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NewPhilHealthTableComponent } from '../modals/new-phil-health-table/new-phil-health-table.component';
import { NewSSSTableComponent } from '../modals/new-ssstable/new-ssstable.component';
import { NewPITableComponent } from '../modals/new-pitable/new-pitable.component';
import { NewTaxTableComponent } from '../modals/new-taxtable/new-taxtable.component';

@Component({
  selector: 'ngx-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss']
})
export class ContributionsComponent implements OnInit {

  toDate = new Date();
  filterQuery = '';
  sortBy = 'mbsTo';
  sortOrder = 'asc';
  selectQuery = "";
  data;
  table;
  loading = false;
  public socketInstance;
  noData = false;
  noTableData = false;;
  errMessage;

  selectQueryString = 'Select Contribution';
  selected = "";

  constructor(
    public sgs: SharedGlobalService,
    public ngbModal: NgbModal
  ) {
    this.socketInstance = sgs.ResponseSocket('phTable').subscribe( emitted => {
      this.selectFilter(this.selectQuery, this.selected);
    });
    this.socketInstance = sgs.ResponseSocket('sssTable').subscribe( emitted => {
      this.selectFilter(this.selectQuery, this.selected);
    });
    this.socketInstance = sgs.ResponseSocket('piTable').subscribe( emitted => {
      this.selectFilter(this.selectQuery, this.selected);
    });
    this.socketInstance = sgs.ResponseSocket('taxTable').subscribe( emitted => {
      this.selectFilter(this.selectQuery, this.selected);
    });

   }

  ngOnInit() {

    this.selectFilter();
  }

  ngOnDestroy(){
    // this.socketInstance.unsubscribe();
  }

  selectFilter(name = 'pHealth', value = 'Phil Health'){
    this.selectQuery = name;
    this.selected = value;
    this.selectQueryString = value;
    if(name == 'pHealth'){
      this.loading = true;
      this.sgs.request('get', 'phTable/getActivePHTable', null, async (res) => {
        if(res.success){
          this.loading = false;
          this.noData = false;
          this.data = res.data;
          if(res.data.table){
            this.table = res.data.table;
            this.noTableData = false;
          }else{
            this.table = [];
            this.noTableData = true;
            this.errMessage = "No available data.";
          }
        }else{
          this.loading = false;
          this.errMessage = res.message;
          this.noData = true;
        }
      });
    }else if(name == 'sss'){
      this.loading = true;
      this.sgs.request('get', 'sssTable/getActiveSSSTable', null, async (res) => {
        if(res.success){
          this.loading = false;
          this.noData = false;
          this.data = res.data;
          if(res.data){
            this.table = res.data.table;
            this.noTableData = false;
            this.noData = false;
          }else{
            this.table = [];
            this.noTableData = true;
            this.errMessage = "No available data.";
            this.noData = true;
          }
        }else{
          this.loading = false;
          this.errMessage = res.message;
          this.noData = true;
        }
      });
    }else if(name == 'pagIbig'){
      this.loading = true;
      this.sgs.request('get', 'piTable/getActivePITable', null, async (res) => {
        if(res.success){
          this.loading = false;
          this.noData = false;
          this.data = res.data;
          if(res.data){
            this.table = res.data.table;
            this.noTableData = false;
            this.noData = false;
          }else{
            this.table = [];
            this.noTableData = true;
            this.errMessage = "No available data.";
            this.noData = true;
          }
        }else{
          this.loading = false;
          this.errMessage = res.message;
          this.noData = true;
        }
      });
    }else if(name == 'tax'){
      this.loading = true;
      this.sgs.request('get', 'taxTable/getActiveTaxTable', null, async (res) => {
        if(res.success){
          this.loading = false;
          this.noData = false;
          this.data = res.data;
          if(res.data){
            this.table = res.data.table;
            this.noTableData = false;
            this.noData = false;
          }else{
            this.table = [];
            this.noTableData = true;
            this.errMessage = "No available data.";
            this.noData = true;
          }
        }else{
          this.loading = false;
          this.errMessage = res.message;
          this.noData = true;
        }
      });
    }
  }

  addNewTable(type){
    this.sgs.Modal({
      header: `System Message`,
      content: `
        <center><i class="fas fa-exclamation-triangle modal_error_icon"></i></center>
        <center>Note: This action will disable the previous table and generate a new one. Please proceed with caution.</center>
      `,
      type: 'confirmation',
      buttonName: 'close'
    }, { size: 'sm'})
    .confirm.subscribe( response => {
      if( response ){
        if(type == "pHealth"){
          const activeModal = this.ngbModal.open(NewPhilHealthTableComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height' });
          activeModal.componentInstance.status = 1;
        }else if(type == "sss"){
          const activeModal = this.ngbModal.open(NewSSSTableComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
          activeModal.componentInstance.status = 1;
        }else if(type == 'pagIbig'){
          const activeModal = this.ngbModal.open(NewPITableComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
          activeModal.componentInstance.status = 1;
        }else if(type == 'tax'){
          const activeModal = this.ngbModal.open(NewTaxTableComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
          activeModal.componentInstance.status = 1;
        }
      }
    });
  }

  addNewDataToTable(){
    if(this.selectQuery == "pHealth"){
      const activeModal = this.ngbModal.open(NewPhilHealthTableComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height' });
      activeModal.componentInstance.status = 3;
    }else if(this.selectQuery == "sss"){
      const activeModal = this.ngbModal.open(NewSSSTableComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
      activeModal.componentInstance.status = 3;
    }else if(this.selectQuery == "pagIbig"){
      const activeModal = this.ngbModal.open(NewPITableComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
      activeModal.componentInstance.status = 3;
    }else if(this.selectQuery == "tax"){
      const activeModal = this.ngbModal.open(NewTaxTableComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
      activeModal.componentInstance.status = 3;
    }
  }

  edit(data){
    if(this.selectQuery == "pHealth"){
      const activeModal = this.ngbModal.open(NewPhilHealthTableComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height' });
      activeModal.componentInstance.status = 4;
      activeModal.componentInstance.modalData = data;
    }else if(this.selectQuery == 'sss'){
      const activeModal = this.ngbModal.open(NewSSSTableComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
      activeModal.componentInstance.status = 4;
      activeModal.componentInstance.modalData = data;
    }else if(this.selectQuery == 'pagIbig'){
      const activeModal = this.ngbModal.open(NewPITableComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
      activeModal.componentInstance.status = 4;
      activeModal.componentInstance.modalData = data;
    }else if(this.selectQuery == 'tax'){
      const activeModal = this.ngbModal.open(NewTaxTableComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
      activeModal.componentInstance.status = 4;
      activeModal.componentInstance.modalData = data;
    }
  }

  remove(data){
    this.sgs.Modal({
      header: `System Message`,
      content: `
        <center><i class="fas fa-exclamation-triangle modal_error_icon"></i></center>
        <center>Are you sure you want to remove?</center>
      `,
      type: 'confirmation',
      buttonName: 'close'
    }, { size: 'sm'})
    .confirm.subscribe( response => {
      if( response ){
        if(this.selectQuery == "pHealth"){
          this.sgs.request('post', 'phTable/changeTableStatus', {id: data._id, status: false  }, async (res) => {
            if(res.success){
              this.sgs.Toaster('success', 'Success', 'The data has been remove.')
            }
          });
        }else if(this.selectQuery == "sss"){
          this.sgs.request('post', 'sssTable/changeTableStatus', {id: data._id, status: false  }, async (res) => {
            if(res.success){
              this.sgs.Toaster('success', 'Success', 'The data has been remove.')
            }
          });
        }
        else if(this.selectQuery == "pagIbig"){
          this.sgs.request('post', 'piTable/changeTableStatus', {id: data._id, status: false  }, async (res) => {
            if(res.success){
              this.sgs.Toaster('success', 'Success', 'The data has been remove.')
            }
          });
        }
        else if(this.selectQuery == "tax"){
          this.sgs.request('post', 'taxTable/changeTableStatus', {id: data._id, status: false  }, async (res) => {
            if(res.success){
              this.sgs.Toaster('success', 'Success', 'The data has been remove.')
            }
          });
        }
      }
    });
  }
}
