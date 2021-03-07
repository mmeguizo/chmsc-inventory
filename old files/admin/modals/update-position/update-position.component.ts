import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';

@Component({
  selector: 'ngx-update-position',
  templateUrl: './update-position.component.html',
  styleUrls: ['./update-position.component.scss']
})
export class UpdatePositionComponent implements OnInit {
data
public form: any;

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService
  ) {

   }

  ngOnInit(): void {
    this.createForm()

  }

  createForm(){
    this.form = this.formBuilder.group({
      id :              [this.data.id],
      position:         [this.data.position, [Validators.required]],
    })
  }

  closeModal(){
    this.activeModal.close()
  }

  update(){
    this.sgs.request('put', 'position/updatePosition', {form : this.form.value}, async(res) => {
      if(res.success){
        this.closeModal()
      }

    })
  }
}
