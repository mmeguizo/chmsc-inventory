import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.scss']
})
export class EditPositionComponent implements OnInit {

  @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();

  public socketInstance;
  public form: any;
  public data : any;

  filterQuery = '';
  sortBy = 'id';
  sortOrder = 'desc';
  selectQueryString = 'ID';
  selectQuery = 'id';

  constructor(
    public activeModal: NgbActiveModal,
    public sgs: SharedGlobalService,
    public formBuilder: FormBuilder
  ) {
    this.createForm();

  }

  createForm() {
    this.form = this.formBuilder.group({
      position:         ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      position:         [this.data.position, [Validators.required]],
    });
  }

  updateType(form){
    this.sgs.request('put', 'position/updatePosition', { id: this.data.id, form: form.value }, async (res) => {
      if(res.success) {
        // this.sgs.request('post', 'counter/updateEmp', {id : this.data.id}, async(res) => {})
        this.sgs.showToaster('success', 'Selected Position has been updated!','Success', 3000,'bottom-right' )
        this.passEntry.emit(res.data);
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.activeModal.close();
  }





}
