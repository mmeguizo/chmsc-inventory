import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import * as moment from 'moment';
import { ReverseDate } from '../../../@core/pipes/dataFilter';

@Component({
  selector: 'ngx-new-payroll',
  templateUrl: './new-payroll.component.html',
  styleUrls: ['./new-payroll.component.scss']
})
export class NewPayrollComponent implements OnInit {

  public loading = true;
  public data;
  public form;
  public status;
  public pid;
  public minDate: Date;

  public dateRange;
  public cutOffFrom;
  public cutOffTo;
  public payrollDescription;
  public title;

  constructor(
    public activeModal: NgbActiveModal,
    public sgs: SharedGlobalService,
    public rd: ReverseDate
  ) { 
  }

  ngOnInit() {    
    console.log(this.title)
    this.minDate = new Date(this.rd.transform(this.minDate));
    this.minDate.setDate(this.minDate.getDate() + 1 );
    if(this.status == 1){
      this.title = "Create New"
    }
    else if(this.status == 2){
      this.title = "Update"
      this.getPayroll();
    }
  }

  create(){
    //disable previous payroll-cutoff
    this.sgs.request('get', 'payroll/checkIfExist', {pid: this.pid}, async (res) => {
      if(res.success){
        this.sgs.request('post', 'payroll/updateStatus', {pid: this.pid, status: 5}, async (res) => {})
      }
      this.sgs.request('post', 'payroll/createPayroll', {
        cutOffFrom: this.dateRange[0], 
        cutOffTo: this.dateRange[1], 
        payrollDescription: this.payrollDescription 
      }, async (res) => {
        if(res.success) {
          this.closeModal();
          this.sgs.Toaster('success', 'Success', 'New Payroll has been created!');
        }
      });
    })
  }

  getPayroll(){
    this.sgs.request('get', 'payroll/getPayroll', {id: this.pid}, async (res) => {
      if(res.success){
        this.cutOffFrom = res.data.cutOffTo;
        this.cutOffTo = res.data.cutOffTo;
        this.dateRange = moment(this.rd.transform(res.data.cutOffFrom)).format('MM-DD-YYYY')+" - "+moment(this.rd.transform(res.data.cutOffTo)).format('MM-DD-YYYY');
        this.payrollDescription = res.data.payrollDescription;
      }
    });
  }

  update(){
    let obj = {}
    if(typeof this.dateRange == 'object'){
      obj = {
        id: this.pid, 
        cutOffFrom: this.dateRange[0], 
        cutOffTo: this.dateRange[1], 
        payrollDescription: this.payrollDescription 
      }
    }else{
      obj = {
        id: this.pid, 
        cutOffFrom: this.cutOffFrom, 
        cutOffTo: this.cutOffTo, 
        payrollDescription: this.payrollDescription 
      }
    }
    this.sgs.request("put", "payroll/updatePayroll", obj, async (res) => {
      if(res.success){
        this.sgs.Toaster('success', 'Success', 'Payroll Information has been updated');
        this.closeModal();
      }
    });
  }

  closeModal(){
    this.activeModal.close();
  }
  

}
