import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePayrollComponent } from '../../modals/create-payroll/create-payroll.component';
import { PayslipComponent } from '../../modals/payslip/payslip.component';
import { PrintPayslipComponent } from '../../modals/print-payslip/print-payslip.component';
import { EditPayslipComponent } from '../../modals/edit-payslip/edit-payslip.component';
import { ActivatedRoute } from '@angular/router';
import { AddAllowanceComponent } from '../../modals/add-allowance/add-allowance.component';

@Component({
  selector: 'ngx-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayslipPayrollComponent implements OnInit {

  public bsValue = new Date();
  public filterQuery = '';
  public sortBy = 'id';
  public sortOrder = 'asc';
  public selectQueryString = 'Name';
  public selectQuery = 'name';
  public data;
  public employee;
  public loading = true;
  public date = new Date();
  public todate;
  public socketInstance;
  public socketInstanceForLoans;
  public activePayroll;
  public socketInstancePrinted: any;

  constructor(
    public sgs: SharedGlobalService,
    public ngbModal: NgbModal,
    public route: ActivatedRoute
  ) {
    this.socketInstance = sgs.ResponseSocket('newPayslip').subscribe( emitted => {
      this.getActivePayroll();
    });
    this.socketInstanceForLoans = sgs.ResponseSocket('loans').subscribe( emitted => {
      this.getActivePayroll();
    });
    this.socketInstancePrinted = sgs.ResponseSocket('printed').subscribe( emitted => {
      this.getActivePayroll();
    })
    this.socketInstance = sgs.ResponseSocket('payroll').subscribe( emitted => {
      this.getActivePayroll();
    })
   }

  ngOnInit() {
    this.getAllUsers();
    this.getActivePayroll();
    console.log('this is the IDDD of your popo', this.route.snapshot.params['id']);

  }

  ngOnDestroy(){
    this.socketInstance.unsubscribe();
    this.socketInstanceForLoans.unsubscribe();
  }

  // get active or newly created payroll
  getActivePayroll(){
    this.sgs.request('get', 'payroll/getSelectedPayroll', {id: this.route.snapshot.params['id']}, async (res) => {
      if(res.success){
        this.activePayroll = res.data;
      }
    })
  }

  getAllUsers(){
    // medrep is excluded
    this.sgs.request('get', 'user/getAllUsersWithProfile', {}, async (res) => {
      if( res.success ){
        this.data = res.data;
        this.loading = false;

      }else{
        this.data = [];
        this.loading = false;
      }
    });
  }


  selectFilter(name, value){
    this.selectQuery = name;
    this.selectQueryString = value;
  }

  createPayroll(){
    const activeModal = this.ngbModal.open(CreatePayrollComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.status = 1;
    activeModal.componentInstance.pid = this.activePayroll.id;
  }

  payslip(id){
    console.log(id);
    console.log(this.activePayroll.cutOffFrom);
    console.log( this.activePayroll.cutOffTo);
    console.log( this.activePayroll.id);


    const activeModal = this.ngbModal.open(PayslipComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.eid = id;
    activeModal.componentInstance.adminView = true;
    activeModal.componentInstance.cutOffFrom = this.activePayroll.cutOffFrom;
    activeModal.componentInstance.cutOffTo = this.activePayroll.cutOffTo;
    activeModal.componentInstance.pid = this.activePayroll.id;
  }

  checkStatus(name){
    this.sgs.Modal({
      header: `System Messagge`,
      content: `
       Payslip for ${name} is generated.
      `,
      buttonName: 'close'
    }, { size: 'sm'});
  }

  viewPayrollEntry(){
console.log('test viewpayroll entry');

  }

  print(summary, from, to, dateAdded, id){

    console.log(summary);
    console.log(from);
    console.log(to);
    console.log(dateAdded);
    console.log(id);


    const activeModal = this.ngbModal.open(PrintPayslipComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.summary = summary;
    activeModal.componentInstance.from = from;
    activeModal.componentInstance.to = to;
    activeModal.componentInstance.dateAdded = dateAdded;
    activeModal.componentInstance.payrollID = id;
  }

  editPayslip(id, data){
    const activeModal = this.ngbModal.open(EditPayslipComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.eid = id;
    activeModal.componentInstance.cutOffFrom = this.activePayroll.cutOffFrom;
    activeModal.componentInstance.cutOffTo = this.activePayroll.cutOffTo;
    activeModal.componentInstance.pid = this.activePayroll.id;
    activeModal.componentInstance.profile = data;
  }

  addAllowance(id){
    const activeModal = this.ngbModal.open(AddAllowanceComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.id = id;
    activeModal.componentInstance.pid = this.activePayroll.id;
  }

  totalSSS = 0;
  totalPagIbig = 0;
  totalPhilHealth = 0;
  totalWTax = 0;
  totalTakeHome = 0;
  totalAllowance = 0;
  debit = 0;
  credit = 0;

  savePayroll(){
    //compute
    this.activePayroll.summary.map(a => {
      this.totalSSS += a.comp_sss + a.sss;
      this.totalPagIbig += a.comp_pagIbig;
      this.totalPhilHealth += a.comp_philHealth;
      this.totalWTax += a.wTax;
      this.totalTakeHome += a.takeHomePay;
      this.totalAllowance += a.allowance;

      this.debit = this.totalSSS + this.totalPagIbig + this.totalPhilHealth + this.totalWTax + this.totalTakeHome + this.totalAllowance;
      this.credit = this.totalSSS + this.totalPagIbig + this.totalPhilHealth + this.totalWTax + this.totalTakeHome + this.totalAllowance;

    })

    let tr = [];
    let th = [`
      <tr>
        <th>Account Code</th>
        <th>Account</th>
        <th>Debit</th>
        <th>Credit</th>
      </tr>
    `]
    // Are you sure you want to save this payroll?
    this.sgs.Modal({
      header: `System Messagge`,
      content: `
       <h5><center>Payroll Journal Summary</center></h5>
       <table class="wide">
        <thead>
          ${th}
        </thead>
        <tbody>
          <tr>
            <td>5-1-01-046</td>
            <td>Salaries expense - net basic pay</td>
            <td>${this.totalTakeHome.toFixed(2)}</td>
            <td></td>
          </tr>

          <tr>
            <td>5-1-01-045</td>
            <td>salaries expense - allowance</td>
            <td>${this.totalAllowance.toFixed(2)}</td>
            <td></td>
          </tr>
          <tr>
            <td>5-1-01-045</td>
            <td>SSS Contribution Expense</td>
            <td>${this.totalSSS.toFixed(2)}</td>
            <td></td>
          </tr>
          <tr>
            <td>5-1-01-045</td>
            <td>Phil-Health Contribution Expense</td>
            <td>${this.totalPhilHealth.toFixed(2)}</td>
            <td></td>
          </tr>
          <tr>
            <td>5-1-01-045</td>
            <td>Pag-ibig Contribution Expense</td>
            <td>${this.totalPagIbig.toFixed(2)}</td>
            <td></td>
          </tr>

          <tr>
            <td>5-1-01-046</td>
            <td>Salaries Payable - net basic pay</td>
            <td></td>
            <td>${this.totalTakeHome.toFixed(2)}</td>
          </tr>

          <tr>
            <td>5-1-01-045</td>
            <td>salaries Payable - allowance</td>
            <td></td>
            <td>${this.totalAllowance.toFixed(2)}</td>
          </tr>
          <tr>
            <td>5-1-01-045</td>
            <td>SSS Contribution Payable</td>
            <td></td>
            <td>${this.totalSSS.toFixed(2)}</td>
          </tr>
          <tr>
            <td>5-1-01-045</td>
            <td>Phil-Health Contribution Payable</td>
            <td></td>
            <td>${this.totalPhilHealth.toFixed(2)}</td>
          </tr>
          <tr>
            <td>5-1-01-045</td>
            <td>Pag-ibig Contribution Payable</td>
            <td></td>
            <td>${this.totalPagIbig.toFixed(2)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="acenter">TOTAL</td>
            <td>${this.debit}</td>
            <td>${this.credit}</td>
        </tfoot>
      </table>
      <p class="acenter error clear">Note: The data is irreversible once save, please review your data before saving.</p>
      `,
      type: 'confirmation',
      buttonName: 'close'
    }, { size: 'lg'})
    .confirm.subscribe( response => {
      if( response ){
        //payroll entries for journal
        let payroll = {
          paymentMethod: "",
          status: 1,
          referenceNo: this.activePayroll.id,
          transactionType: "Payroll",
          memo: "Payroll",
          total: this.debit,
          payeeType: "Employee",
          journalTransactions: [
            {
              journalAccountID: 5101045,
              journalAccountName: "Salaries expense - (net basic pay)",
              journalDescription: "Salaries expense - (net basic pay)",
              entryType: "Debit",
              amountCredit: 0,
              amountDebit: this.totalTakeHome,
            },
            {
              journalAccountID: 5101046,
              journalAccountName: "Salaries expense - (allowance)",
              journalDescription: "Salaries expense - (allowance)",
              entryType: "Debit",
              amountCredit: 0,
              amountDebit: this.totalAllowance,
            },
            {
              journalAccountID: 5101041,
              journalAccountName: "SSS contribution expense",
              journalDescription: "SSS contribution expense",
              entryType: "Debit",
              amountCredit: 0,
              amountDebit: this.totalSSS,
            },
            {
              journalAccountID: 5101043,
              journalAccountName: "Phil-health contribution expense",
              journalDescription: "Phil-health contribution expense",
              entryType: "Debit",
              amountCredit: 0,
              amountDebit: this.totalPhilHealth,
            },
            {
              journalAccountID: 5101042,
              journalAccountName: "Pag-ibig contribtution expense",
              journalDescription: "Pag-ibig contribtution expense",
              entryType: "Debit",
              amountCredit: 0,
              amountDebit: this.totalPhilHealth,
            },

            {
              journalAccountID: 2101011,
              journalAccountName: "Salaries payable - (net basic pay)",
              journalDescription: "Salaries payable - (net basic pay)",
              entryType: "Debit",
              amountDebit: 0,
              amountCredit: this.totalTakeHome,
            },
            {
              journalAccountID: 2101012,
              journalAccountName: "Salaries payable - (allowance)",
              journalDescription: "Salaries payable - (allowance)",
              entryType: "Debit",
              amountDebit: 0,
              amountCredit: this.totalAllowance,
            },
            {
              journalAccountID: 2101002,
              journalAccountName: "SSS payable expense",
              journalDescription: "SSS payable expense",
              entryType: "Debit",
              amountDebit: 0,
              amountCredit: this.totalSSS,
            },
            {
              journalAccountID: 2101004,
              journalAccountName: "Phil-health payable expense",
              journalDescription: "Phil-health payable expense",
              entryType: "Debit",
              amountDebit: 0,
              amountCredit: this.totalPhilHealth,
            },
            {
              journalAccountID: 2101010,
              journalAccountName: "Pag-ibig payable expense",
              journalDescription: "Pag-ibig payable expense",
              entryType: "Debit",
              amountDebit: 0,
              amountCredit: this.totalPhilHealth,
            },
          ]
        }

        // this.sgs.request('post', 'journalEntry/savePayroll', {payroll: payroll}, async (res) => {
        //   if(res.success){
        //     this.sgs.request('post', 'payroll/updateStatus', {pid: this.activePayroll.id, status: 5}, async (res) => {
        //       if(res.success){
        //         this.sgs.Toaster('succes', 'Success', "The Payroll has been successfully save.");
        //       }
        //     });
        //   }
        // })

        this.sgs.request('post', 'payroll/updateStatus', {pid: this.activePayroll.id, status: 5}, async (res) => {
          if(res.success){
            this.sgs.Toaster('succes', 'Success', "The Payroll has been successfully save.");
          }
        });

      }
    })
  }

}
