import { Component, OnInit,  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReverseDate } from '../../../@core/pipes/dataFilter';

@Component({
  selector: 'ngx-add-allowance',
  templateUrl: './add-allowance.component.html',
  styleUrls: ['./add-allowance.component.scss']
})
export class AddAllowanceComponent implements OnInit {

  public form;
  public id: any;
  public pid: any;
  public takeHomePay = 0;
  public allowance = 0;

  constructor(
    public activeModal: NgbActiveModal,
    public sgs: SharedGlobalService,
    public formBuilder: FormBuilder,
  ) { 
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      allowance:               ['', [Validators.required]],
    });
   }

  ngOnInit() {
    this.sgs.request('get', 'payroll/checkPayrollIfExist', {pid: this.pid, eid: this.id}, async (res) => {
      if(res.success){
        this.form = this.formBuilder.group({
          allowance:               [res.data.allowance, [Validators.required]],
        });
        this.takeHomePay = res.data.takeHomePay - res.data.allowance;
        console.log(this.takeHomePay)
      };
    });
  }


   

  submit(){
    this.takeHomePay = this.takeHomePay + this.form.value.allowance;
    this.sgs.request('put', 'payroll/addAllowance', {id: this.id, pid: this.pid, form: this.form.value, takeHomePay: this.takeHomePay}, async (res) => {
      if(res.success){
        this.sgs.Toaster('success', 'Success', 'Allowance has been added succesfully.');
        this.closeModal();
      }
    })
  }

  closeModal(){
    this.activeModal.close();
  }

}
