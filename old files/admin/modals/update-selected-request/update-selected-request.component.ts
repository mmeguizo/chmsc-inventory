import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators } from '@angular/forms';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'ngx-update-selected-request',
  templateUrl: './update-selected-request.component.html',
  styleUrls: ['./update-selected-request.component.scss']
})
export class UpdateSelectedRequestComponent implements OnInit {
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
      id : [this.data.stock_id],
      material : [this.data.material_name,[Validators.required]],
      qty : [this.data.qty, [Validators.required]]
    })
  }

selectMaterials(){
    this.sgs.request('get', 'truck_material/get_all_materials', null, async(res) => {
      if(res.success){
        selector(res.data)
      }
      else {
        selector([])
      }

    })
    let selector = (data) => {
      this.sgs.Modal({
      header: `Select Material`,
      content : {
        type : 'array-object',
        data : data,
        display : [
          {property: 'id', nicename : "#"},
          {property: 'name', nicename : "Name"},
          {property: 'description', nicename : "Description"},
          {property: 'brand', nicename : "Brand"},
        ],
        return: ['id','name'],
        search: true,
        searchTo: ['id', 'name', 'description', 'brand'],
        sortTo: 'id',
      },
      accept: 'single',
      type: 'selector',

      }, {size: 'lg'})
      .selected.subscribe(response => {
        if(response){
          this.form.patchValue({
            id : response.data[0],
            material : response.data[1]
          })
        }


      })
    }
  }

  update(){
    this.sgs.request('put','request/update_selected_request', {form : this.form.value, id : this.data._id}, async(res) => {
      this.sgs.showToaster('success','Request has been edited.','Success', 2000, 'bottom-right');
      this.closeModal()

    })

  }
}
