import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { ReverseDate } from '../../../@core/pipes/dataFilter';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-add-payroll',
  templateUrl: './edit-overtime.component.html',
  styleUrls: ['./edit-overtime.component.scss']
})
export class EditOvertimeComponent implements OnInit {
  public loading = true;
  public data;
  public overtime;
  public form;
  public status;
  public pid;
  public minDate: Date;
  public overtimes = [];
  public dateRange;
  public dateRangeOptions;
  public cutOffFrom;
  public cutOffTo;
  public payrollDescription;
  public empID;

  constructor(
    public activeModal: NgbActiveModal,
    public sgs: SharedGlobalService,
    public rd: ReverseDate,
    public formBuilder: FormBuilder,


  ) { }

  ngOnInit(): void {

    this.overtimes.push(this.overtime)


    this.getCutoff()
    //set in to the official logout date set by the company
    // get the logout data in db and patch it to the form


    this.form = this.formBuilder.group({
      payroll:               ['', [Validators.required]],
      in:                    ['', [Validators.required]],
      out:                   ['', [Validators.required]],
      reason:               ['', [Validators.required]],
    });

    this.createForm();
  }


  getCutoff(){
    this.sgs.request('get','payroll/getActivePayrollforOT',{date : new Date().toISOString() }, res => {
      console.log(res.data);

      if(res.success) {
        this.dateRangeOptions = res.data;
        console.log(this.dateRangeOptions);
      }

    })
  }

  createForm(){
    this.form = this.formBuilder.group({
      payroll:               [this.overtime.payroll_id, [Validators.required]],
      in:                    [this.rd.transform(this.overtime.start), [Validators.required]],
      out:                   [this.rd.transform(this.overtime.end), [Validators.required]],
      reason:               [this.overtime.reason, [Validators.required]],
    });
   }


   cutoffCompare(d1,d2){

    return d1

   }

  closeModal(){
    this.activeModal.close()
  }
  updateOT(form){

    form.value.eid  = this.overtime.emp_id;
    form.value.id = this.overtime.id


    this.sgs.request('put','overtime/EditOvertime',{ form : form.value }, async(res) => {
      if(res.success){
        this.sgs.showToaster('success', 'OT Updated Successfully.', 'Success', 3000, 'bottom-right');
        this.closeModal();
      }else{
        this.sgs.showToaster('warning', 'No Changes', 'Hmmm', 3000, 'bottom-right');
        this.closeModal();
      }
     })

  }

}
