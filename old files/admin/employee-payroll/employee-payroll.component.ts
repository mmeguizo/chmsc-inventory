import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { AddPayrollComponent } from '../modals/add-payroll/add-payroll.component';
import { DeductionsComponent } from '../modals/deductions/deductions.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPayrollComponent } from '../modals/new-payroll/new-payroll.component';


@Component({
  selector: 'ngx-employee-payroll',
  templateUrl: './employee-payroll.component.html',
  styleUrls: ['./employee-payroll.component.scss']
})
export class EmployeePayrollComponent implements OnInit {
  public data = []
  loading = true
  public minDate = Date;
  public socketInstance;


  constructor(
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService,
    public ngbModal: NgbModal,

  ) {
    this.socketInstance = sgs.ResponseSocket('payroll').subscribe( emitted => {
      this.getAllPayroll();
    });
    this.socketInstance = sgs.ResponseSocket('newPayroll').subscribe( emitted => {
      this.getAllPayroll();
    });
   }

  ngOnInit(): void {
    this.getAllPayroll()
  }


  getAllPayroll(){
    this.sgs.request('get', 'payroll/getAllPayroll', null, async (res) => {
      if(res.success){
        this.loading = false
        this.data = res.data;
        if(res.data.length >= 1){
          this.minDate = res.data[0].cutOffTo;
        }
      }else{
        this.data = [];
      }
    })
  }


  updatePayroll(id){
    const activeModal = this.ngbModal.open(NewPayrollComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
    activeModal.componentInstance.status = 2;
    activeModal.componentInstance.pid = id;
  }


  approve(id){
    this.sgs.Modal({
      header: `Confirmation`,
      content: `Are you sure to approve the selected payroll cut-off?`,
      type: 'confirmation',
    }, { size: 'sm' })

    .confirm.subscribe( response => {
      if( response ){
        this.sgs.request('put', 'payroll/changeStatus', {id:id, status: 3}, response => {
          this.sgs.Toaster('success', 'Success', 'Payroll Cut-Off has been aprove.');
        })
      }
    });
  }

  closeCutOff(id){
    this.sgs.Modal({
      header: `System Message`,
      content: `
        <center>Are you sure you want to close this cut-off period?</center>
      `,
      type: 'confirmation',
      buttonName: 'close'
    }, { size: 'sm'})
    .confirm.subscribe( response => {
      if( response ){
        this.sgs.request('post', 'payroll/updateStatus', {pid: id, status: 5}, async (res) => {
          this.sgs.Toaster('success', 'Success', 'The selected cuf-off period has been close.');
        })
      }
    })
  }

  createNewPayroll(){
    this.sgs.Modal(
      {minDate : this.minDate},
      {component : AddPayrollComponent, size : 'sm'}
    )
  }

  deductions(){
    this.sgs.goto('admin/contributions');

  }
}
