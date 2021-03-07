import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';

@Component({
  selector: 'ngx-add-deductions',
  templateUrl: './add-deductions.component.html',
  styleUrls: ['./add-deductions.component.scss']
})
export class AddDeductionsComponent implements OnInit {
  public form : any
  constructor(

    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService,
    public ngbModal: NgbModal,
  ) {
    this.createForm()
   }

  ngOnInit(): void {

  }


createForm(){
  this.form = this.formBuilder.group({
    deductionType : ['', Validators.required],
    deductionName : ['', Validators.required],
    deductionPercentage : [''],
    deductionAmount : [''],


  })
}

deduc(){
  if(this.form.value.deductionType === 'amount'){
      console.log('amount');
        this.form.controls.deductionAmount.setValidators([Validators.required])
        this.form.controls.deductionAmount.updateValueAndValidity();

        this.form.controls.deductionPercentage.clearValidators()
        this.form.controls.deductionPercentage.updateValueAndValidity();
        }else{
        this.form.controls.deductionPercentage.setValidators([Validators.required])
        this.form.controls.deductionPercentage.updateValueAndValidity();

        this.form.controls.deductionAmount.clearValidators([Validators.required])
        this.form.controls.deductionAmount.updateValueAndValidity()
  }
  
    
}

closeModal(){
  this.activeModal.close()
}

save(){
    
 this.sgs.request('post', 'deduction/addDeduction', {form : this.form.value}, async(res) =>
 {
 if(res.success){
   this.closeModal()
 }

 })
}

}
