import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReverseDate } from '../../../@core/pipes/dataFilter';

@Component({
  selector: 'ngx-edit-payslip',
  templateUrl: './edit-payslip.component.html',
  styleUrls: ['./edit-payslip.component.scss']
})
export class EditPayslipComponent implements OnInit {

  public form; //form builder form
  public toDate = new Date();
  public data;
  public loading = false;

  public eid; // employee ID
  public cutOffFrom;
  public cutOffTo;
  public pid; // payslipt ID
  public profile: any;

  public loans: any;

  public totalDeductions = 0;
  public takeHome = 0;
  public taxable = 0;


  constructor(
    public sgs: SharedGlobalService,
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public rd: ReverseDate
  ) {
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      totalHours:               ['', [Validators.required]],
      hourlyRate:               ['', [Validators.required]],
      monthlyRate:              ['', [Validators.required]],
      taxable:                  ['', [Validators.required]],
      late:                     ['', [Validators.required]],
      sss:                      ['', [Validators.required]],
      philHealth:               ['', [Validators.required]],
      pagIbig:                  ['', [Validators.required]],
      wTax:                     ['', [Validators.required]],
      totalTax:                 ['', [Validators.required]],
      takeHomePay:              ['', [Validators.required]],
      totalDeductions:          ['', [Validators.required]],
      loans:                    ['', [Validators.required]],
      loanAmount:               [''],
      status:                   [''],
      netPay:                   [''],
      allowance:                [''],
      comp_sss:                 ['', [Validators.required]],
      comp_philHealth:          ['', [Validators.required]],
      comp_pagIbig:             ['', [Validators.required]],
    });
   }

  ngOnInit() {
    this.sgs.request('get', 'payroll/checkPayrollIfExist', {pid: this.pid, eid: this.eid}, async (res) => {

      if(res.success){
        this.loans = res.data.loans;
        this.form = this.formBuilder.group({
          totalHours:               [res.data.totalHours, [Validators.required]],
          late:                     [res.data.late, [Validators.required]],
          hourlyRate:               [res.data.hourlyRate, [Validators.required]],
          monthlyRate:              [res.data.monthlyRate, [Validators.required]],
          taxable:                  [res.data.netPay, [Validators.required]],
          sss:                      [res.data.sss, [Validators.required]],
          philHealth:               [res.data.philHealth, [Validators.required]],
          pagIbig:                  [res.data.pagIbig, [Validators.required]],
          wTax:                     [res.data.wTax, [Validators.required]],
          totalTax:                 [res.data.totalTax, [Validators.required]],
          takeHomePay:              [res.data.takeHomePay, [Validators.required]],
          totalDeductions:          [res.data.totalDeductions, [Validators.required]],
          loans:                    [res.data.loans, [Validators.required]],
          loanAmount:               [''],
          status:                   [res.data.status],
          netPay:                   [res.data.netPay],
          allowance:                [res.data.allowance],
          comp_sss:                 [res.data.comp_sss, [Validators.required]],
          comp_philHealth:          [res.data.comp_philHealth, [Validators.required]],
          comp_pagIbig:             [res.data.comp_pagIbig, [Validators.required]]
        });
        this.taxable = res.data.netPay;
        this.totalDeductions = res.data.totalDeductions;
      }
    });
  }

  updatePayslip(){



    this.form.value.totalDeductions = this.totalDeductions;
    // this.form.value.takeHomePay = this.takeHome;
    this.form.value.netPay = this.taxable;
    if(this.form.value.loans.length>=1){
      if(this.form.value.loanAmount != ""){
        this.form.value.loans[0].amount = this.form.value.loanAmount;
      }else{
        this.form.value.loans[0].amount = this.loans[0].amount;
      }
    }

    console.log(this.form.value);

    this.sgs.request('post', 'payroll/updatePayslip', {
      eid: this.eid,
      form: this.form.value,
      pid: this.pid
    }, async (res) => {
      this.sgs.Toaster('success', 'Success', 'Payslip has been updated!');
      this.closeModal();
    })


  }


  public allowance = 0;
  compute(){

  //rounding decimal with precision
    function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
  }



    // let totalDeduction = parseFloat(this.form.value.sss) + parseFloat(this.form.value.philHealth) + parseFloat(this.form.value.pagIbig) + parseFloat(this.form.value.wTax) + (parseFloat(this.form.value.hourlyRate) * parseFloat(this.form.value.late) );

    let totalDeduction = Math.abs(((this.form.value.sss + this.form.value.philHealth + this.form.value.pagIbig + this.form.value.wTax + (this.form.value.late * this.form.value.hourlyRate))));

    let taxable = parseFloat(this.form.value.totalHours) * parseFloat(this.form.value.hourlyRate);

    // //round decimal
    // round(totalDeduction,2)



    let takeHome = (taxable + this.form.value.allowance) -  round(totalDeduction,2);

    this.totalDeductions =  round(totalDeduction,2);
    // this.takeHome = takeHome;
    this.form.value.takeHomePay = takeHome;
    this.taxable = taxable;

    document.getElementById('taxable').innerHTML = taxable.toString();
    document.getElementById('totalDeductions').innerHTML = round(totalDeduction,2).toString();
    document.getElementById('takeHomePay').innerHTML = round(takeHome,2).toString();

    //set form takehome value
    this.form.controls['takeHomePay'].setValue( round(takeHome,2));

  }

  closeModal(){
    this.activeModal.close();
  }
}
