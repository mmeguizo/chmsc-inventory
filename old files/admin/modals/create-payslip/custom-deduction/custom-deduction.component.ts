import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { SharedGlobalService } from '../../../../@core/services/shared.global.service';

@Component({
  selector: 'ngx-custom-deduction',
  templateUrl: './custom-deduction.component.html',
  styleUrls: ['./custom-deduction.component.scss']
})
export class CustomDeductionComponent implements OnInit {
  public form : any
  public event: EventEmitter<any> = new EventEmitter();
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
    deductiontotal : ['']


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
    if(this.form.value.deductionPercentage === ''){
        this.form.value.deductiontotal = this.form.value.deductionAmount

    }
    else if(this.form.value.deductionAmount === ''){
        this.form.value.deductiontotal = this.form.value.deductionPercentage

    }
    this.activeModal.close(this.form.value)

//  this.sgs.request('post', 'deduction/addDeduction', {form : this.form.value}, async(res) =>
//  {
//  if(res.success){
//    this.closeModal()
//  }

//  })
}
}
