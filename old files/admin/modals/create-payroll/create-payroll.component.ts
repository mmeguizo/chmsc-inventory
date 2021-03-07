import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { CreatePayslipComponent } from '../create-payslip/create-payslip.component';
@Component({
  selector: 'ngx-create-payroll',
  templateUrl: './create-payroll.component.html',
  styleUrls: ['./create-payroll.component.scss']
})
export class CreatePayrollComponent implements OnInit {
  public data = []
  loading = true
  public activePayroll;
  public socketInstance;
  public socketInstanceForLoans;
  public socketInstancePrinted: any;
  public filterQuery = '';
  public sortBy = 'id';
  public sortOrder = 'asc';
  public selectQueryString = 'ID';
  public selectQuery = 'id';

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

  ngOnInit(): void {
    this.getAllEmployee()
    this.getActivePayroll()
  }

  ngOnDestroy(){
    this.socketInstance.unsubscribe();
    this.socketInstanceForLoans.unsubscribe();
  }

  getActivePayroll(){
    this.sgs.request('get', 'payroll/getSelectedPayroll', {id: this.route.snapshot.params['id']}, async (res) => {
      console.log(res.data);

      if(res.success){
        this.activePayroll = res.data;
      }
    })
  }


  getAllEmployee(){
    this.sgs.request('get','employee/getAllEmployees', null , async(res) => {
      if(res.success){
          this.loading = false
          this.data = res.data
      }
      else
      {
        this.loading =false
        this.data = []
      }
    })
  }

  payslip( data){

    this.sgs.Modal(
      {data : data,pid: this.activePayroll.id, cutOffFrom : this.activePayroll?.cutOffFrom,cutOffTo : this.activePayroll?.cutOffTo },
      {component:CreatePayslipComponent, size : 'lg' }
    )
  }

}
