import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { async } from 'rxjs/internal/scheduler/async';
@Component({
  selector: 'ngx-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.scss']
})
export class AddPositionComponent implements OnInit {
  public form: any;

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService
  ) {
   this.createForm()
   }

  ngOnInit(): void {
  }


  createForm(){
    this.form = this.formBuilder.group({
      position:         ['', [Validators.required]],
    })
  }

  closeModal(){
    this.activeModal.close()
  }

  save(){
    this.sgs.request('post', 'position/addPosition', {form : this.form.value}, async(res) => {
      if(res.success){
        this.sgs.showToaster('success', 'New position has been added.','Success', 2000, 'bottom-right')
        this.closeModal()
      }

    })
  }
}
