import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { ReverseDate } from '../../../@core/pipes/dataFilter';

@Component({
  selector: 'ngx-add-payroll',
  templateUrl: './add-payroll.component.html',
  styleUrls: ['./add-payroll.component.scss']
})
export class AddPayrollComponent implements OnInit {
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

  constructor(
    public activeModal: NgbActiveModal,
    public sgs: SharedGlobalService,
    public rd: ReverseDate

  ) { }

  ngOnInit(): void {
    this.minDate = new Date(this.rd.transform(this.minDate));
    this.minDate.setDate(this.minDate.getDate() + 1 );



  }

  closeModal(){
    this.activeModal.close()
  }
  create(){
    this.sgs.request('post','payroll/createPayroll',
     {
      cutOffFrom : this.dateRange[0],
      cutOffTo : this.dateRange[1],
      payrollDescription : this.payrollDescription
     }, async(res) => {
      if(res.success){
        this.closeModal()
        this.sgs.showToaster('success', 'Payslip generated successfully.', 'Success', 2000, 'bottom-right')
      }
     })
  }
}
