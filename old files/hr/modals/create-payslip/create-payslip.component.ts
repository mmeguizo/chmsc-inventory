import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TotalHoursComponent } from '../total-hours/total-hours.component';
import { async } from 'rxjs/internal/scheduler/async';
import { CustomDeductionComponent } from './custom-deduction/custom-deduction.component';
import { modalConfigDefaults } from 'ngx-bootstrap/modal/modal-options.class';
import * as _ from 'lodash';
@Component({
  selector: 'ngx-create-payslip',
  templateUrl: './create-payslip.component.html',
  styleUrls: ['./create-payslip.component.scss']
})
export class CreatePayslipComponent implements OnInit {
  loading = true
  //payroll id, cutoffs
  pid
  cutOffTo
  cutOffFrom
  // to add or update
  public btnStatus = true;

  //employee data
  data

  public totalHours
  public totalAmount
  public totalPercent

  public deduction = []
  //seperate for amount and percentage
  public amount = []
  public percent = []
  //socket for total Hours
  public socketInstanceforHours;
//net pay
public netPay
  constructor(
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService,
    public activeModal  : NgbActiveModal, 
    public modalService : NgbModal
  ) {
    this.getAllDeductions()
    this.socketInstanceforHours = sgs.ResponseSocket('addTotalHours').subscribe(emitted => {
      this.data.employmentDetails.totalHours = emitted.data
      this.pay()
    })

  }

  ngOnInit(): void {
      console.log(this.data);
      
    this.pay()
    this.checkPayroll()

  }

  checkPayroll(){
    this.sgs.request('get', 'payroll/checkPayrollIfExist',{pid: this.pid, eid: this.data.id}, async(res) => {
      if(res.success){
        this.btnStatus= false
        this.data.employmentDetails.hourlyRate = res.data.hourlyRate
        this.data.employmentDetails.totalHours = res.data.totalHours
        this.data.employmentDetails.monthlySalary = res.data.monthlyRate
        this.deduction = res.data.deductions
      }

    } )
  }

  pay(){
    if(this.data.employmentDetails.totalHours == undefined || this.data.employmentDetails.hourlyRate == undefined){
      this.netPay = ''
    }
    else {
      this.netPay = this.data.employmentDetails.totalHours * this.data.employmentDetails.hourlyRate
    }
    console.log(this.netPay);
    
  }

  getAllDeductions(){
    this.sgs.request('get', 'deduction/getAllDeductions', null , async(res) => {
        
        
      if(res.success){
       this.amount =  _.filter(res.data, (amount) => {return amount.deductionType === 'amount'})
       this.percent = _.filter(res.data, (percent) => {return percent.deductionType === 'percentage'})
       this.totalAmount = this.amount.map(e => e.deductiontotal).reduce((a, c) => { return a + c})
       this.totalPercent = this.percent.map(e => e.deductiontotal).reduce((a, c) => { return a + c})
        this.loading = false
        this.deduction = res.data
    //   this.total = this.deduction.map(e => e.deductiontotal).reduce((a, c) => { return a + c})
      }
      else {
        this.deduction = []
      }
    })
  }

  closeModal(){
    this.activeModal.close()
  }


  changeTotalHours(eid, totalHours){
     this.sgs.Modal(
      {eid,totalHours},
      {component : TotalHoursComponent, size : 'sm'}
    )
  
  }


  save(){
    // this.sgs.request('put', 'payroll/pushSumarry',
    // {
    //   pid : this.pid,
    //   eid : this.data.id,
    //   totalHours : this.data.employmentDetails.totalHours,
    //   netPay : this.netPay - this.total,
    //   hourlyRate : this.data.employmentDetails.hourlyRate,
    //   monthlySalary : this.data.employmentDetails.monthlySalary,
    //   deduction : this.deduction,
    //   totalDeductions : this.total
    // }, async(res) => {
    //   if(res.success){
    //     this.sgs.Toaster('success','Congats!','Payslip generated successfully')
    //   }

    // })

  }

  customDeduction(){
      const activeModal = this.modalService.open(CustomDeductionComponent, {size : 'sm'})
      activeModal.result.then(res => {
          if(res){
              if(res.deductionType === 'amount'){
                this.amount.push(res)
                this.totalAmount = this.amount.map(e => e.deductiontotal).reduce((a, c) => { return a + c})

              }
              else if(res.deductionType === 'percentage'){
                this.percent.push(res)
                this.totalPercent = this.percent.map(e => e.deductiontotal).reduce((a, c) => { return a + c})

              }
              


            // this.deduction.push(res)
            //  this.amount = _.filter(this.deduction, (amount) => {return amount.deductionType == 'amount'})
            //  this.percent = _.filter(this.deduction, (percent) => {return percent.deductionType == 'percentage'})

         
            
            // this.total = this.deduction.map(e => e.deductiontotal).reduce((a, c) => { return a + c})
            // console.log(this.deduction);
          }
      })}
}
