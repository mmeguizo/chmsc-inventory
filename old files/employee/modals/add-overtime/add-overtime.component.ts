import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { ReverseDate } from '../../../@core/pipes/dataFilter';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-add-payroll',
  templateUrl: './add-overtime.component.html',
  styleUrls: ['./add-overtime.component.scss']
})
export class AddOvertimeComponent implements OnInit {
  public loading = true;
  public data;
  public form;
  public status;
  public pid;
  public minDate: Date;

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

    this.getCutoff()
    //set in to the official logout date set by the company
    // get the logout data in db and patch it to the form
    // this.sgs.request('get', 'day/getDays', {}, async (res) => {
    //   res.data ? res.data.map( e => { this.form.controls['in'].patchValue( this.rd.transform(e.ends) , {onlySelf : true} ) }) : this.form.controls['in'].patchValue( '' , {onlySelf : true} )
    // })

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
      payroll:               ['', [Validators.required]],
      in:                    ['', [Validators.required]],
      out:                   ['', [Validators.required]],
      reason:               ['', [Validators.required]],
    });
   }



  closeModal(){
    this.activeModal.close()
  }
  create(form){

    form.value.date_requested = new Date()
    form.value.eid  = this.empID;

    console.log(form.value);


    this.sgs.request('post','overtime/addOvertime',{ form : form.value }, async(res) => {

      if(res.success){
        this.sgs.showToaster('success', 'requested OT Successfully.', 'Success', 3000, 'bottom-right');
        this.closeModal();

      }
     })
  }
}
