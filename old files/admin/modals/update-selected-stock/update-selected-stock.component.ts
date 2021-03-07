import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';

@Component({
  selector: 'ngx-update-selected-stock',
  templateUrl: './update-selected-stock.component.html',
  styleUrls: ['./update-selected-stock.component.scss']
})
export class UpdateSelectedStockComponent implements OnInit {
  public form: any;
  data
  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService
  ) {

   }

  ngOnInit(): void {
    this.createForm()

  }

  closeModal(){
    this.activeModal.close()
  }

  createForm(){
    this.form = this.formBuilder.group({
      id : [this.data._id],
      material : [this.data.material_name,[Validators.required]],
      lot : [this.data.lot],
      qty : [this.data.qty, [Validators.required]],
      noteField : [this.data.noteField],

    })
  }


  update(){
    this.sgs.request('put', 'stock/update_selected_stock', {form : this.form.value}, async (res) => {
      if(res.success){
        this.sgs.showToaster('success', 'Stocks successfully updated.', 'Success', 2000, 'bottom-right');
        this.closeModal()
      }

    })

  }
}
