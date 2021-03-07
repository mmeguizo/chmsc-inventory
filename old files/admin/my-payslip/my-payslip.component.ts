import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayslipComponent } from '../modals/payslip/payslip.component';
import { AuthService } from '../../@core/services/auth.service';
import { PrintPayslipComponent } from '../modals/print-payslip/print-payslip.component';


SharedGlobalService

@Component({
  selector: 'ngx-my-payslip',
  templateUrl: './my-payslip.component.html',
  styleUrls: ['./my-payslip.component.scss']
})
export class MyPayslipComponent implements OnInit {
  activePayroll: any;
  public loading = true;
  public minDate = Date;
  data = [];
  id: any;
  socketInstance;
  socketInstance1;
  myId : any;

  constructor(

    public sgs: SharedGlobalService,
    public ngbModal: NgbModal,
    public auth: AuthService,


  ) {

    this.myId = this.auth.getTokenData('id');
    this.socketInstance = sgs.ResponseSocket('attendance').subscribe( emitted => {
      this.getAllPayroll();
      this.getActivePayroll();
  });
    this.socketInstance1 = sgs.ResponseSocket('printed').subscribe( emitted => {
      this.getAllPayroll();
      this.getActivePayroll();
  });


   }

  ngOnInit(): void {

    this.getAllPayroll();
    this.myId = this.auth.getTokenData('id');

  }

  ngOnDestroy(){
    this.socketInstance.unsubscribe();
    this.socketInstance1.unsubscribe();
  }


  getAllPayroll(){
    this.sgs.request('get', 'payroll/getMyPayroll', { id : this.myId}, async (res) => {

      if(res.success){
        this.loading = false
        this.data = res.data;
        console.log(this.data);
        console.log(this.myId);

        if(res.data.length >= 1){
          this.minDate = res.data[0].cutOffTo;
        }
      }else{
        this.data = [];
      }
    })
  }

  getActivePayroll(){
    this.sgs.request('get', 'payroll/getSelectedPayroll', {id: this.id}, async (res) => {
      if(res.success){
        this.activePayroll = res.data;
        // console.log(this.activePayroll);
      }
    })
  }



  viewMyPay(data){

    const activeModal = this.ngbModal.open(PayslipComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.eid = this.auth.getTokenData('id');
    activeModal.componentInstance.cutOffFrom = data.cutOffFrom;
    activeModal.componentInstance.cutOffTo = data.cutOffTo;
    activeModal.componentInstance.pid = data.id;
  }


  print(data){

    let summary: any;
    data.summary.map(e => summary = e)

    const activeModal = this.ngbModal.open(PrintPayslipComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.summary = summary;
    activeModal.componentInstance.from =  data.cutOffFrom;
    activeModal.componentInstance.to = data.cutOffTo;
    activeModal.componentInstance.dateAdded = data.dateAdded;
    activeModal.componentInstance.payrollID =  data.id;
  }


}
