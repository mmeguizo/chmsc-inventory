import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-new-taxtable',
  templateUrl: './new-taxtable.component.html',
  styleUrls: ['./new-taxtable.component.scss']
})
export class NewTaxTableComponent implements OnInit {

  form;
  table;
  //modal variables
  lid;
  status;     // 1-new Table | 2 new Table | 3 - add data to Table | 4 - edit
  modalData;  // from component to this modal
  data = [];
  installments;
  isActive;

  constructor(
    public activeModal: NgbActiveModal,
    public sgs: SharedGlobalService,
    public formBuilder: FormBuilder,
  ) { 
    this.createForm('');
  }

  createForm(type) {
    this.form = this.formBuilder.group({
      title:        ['', [Validators.required]],
      description:  [''],
      note:         [''],
    });

    this.table = this.formBuilder.group({
      lowerLimit:       ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],        
      upperLimit:       ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],      
      taxOnLower:       ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],      
      taxOnExcess:      ['', [Validators.required, Validators.min(0), Validators.max(100)]],                
    });
  };

  ngOnInit() {
    if(this.status == 3){
      this.isActive=true;
    }
    if(this.status == 4){
      this.isActive=true;
      this.table = this.formBuilder.group({    
        lowerLimit:       [this.modalData.lowerLimit, [Validators.required, Validators.min(0), Validators.max(999999999)]],        
        upperLimit:       [this.modalData.upperLimit, [Validators.required, Validators.min(0), Validators.max(999999999)]],      
        taxOnLower:       [this.modalData.taxOnLower, [Validators.required, Validators.min(0), Validators.max(999999999)]],      
        taxOnExcess:      [this.modalData.taxOnExcess, [Validators.required, Validators.min(0), Validators.max(100)]],    
      });
    }
  }

  proceed(){
    // disable active table
    this.sgs.request('post', 'taxTable/updateTableStatus', null, async (res) => {
      if(res){
        this.sgs.request('post', 'taxTable/addNewTable', {form: this.form.value}, async (res) => {
          if(res.success){
            this.isActive = true;
            this.sgs.Toaster('success', 'Success', 'New table has been created.');
          }
        });
      }
    });
  }

  save(){ 
    if(this.status == 1 || this.status == 3){
      this.sgs.request('post', 'taxTable/addDataToTable', { table: this.table.value }, async (res) => {
        if(res.success){
          this.sgs.Toaster('success', 'Success', 'New Data has been added to the table.');
          this.createForm(this.table.value.type);
        }
      })
    }
    if(this.status == 4){
      this.sgs.request('post', 'taxTable/updateDataFromTable', {id: this.modalData._id, table: this.table.value}, async (res) => {
        if(res.success){
          this.sgs.Toaster('success', 'Success', 'The data has been updated successfully.');
          this.closeModal();
        }
      });
    }
  } 

  closeModal(){
    this.activeModal.close();
  }
}
