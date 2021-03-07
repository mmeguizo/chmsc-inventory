import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-new-ssstable',
  templateUrl: './new-ssstable.component.html',
  styleUrls: ['./new-ssstable.component.scss']
})
export class NewSSSTableComponent implements OnInit {

  form;
  table;
  //modal variables
  lid;
  status; // 1-new Table | 2 new Table | 3 - add data to Table | 4 - edit
  modalData; // from component to this modal
  data = [];
  installments;
  isActive;

  constructor(
    public activeModal: NgbActiveModal,
    public sgs: SharedGlobalService,
    public formBuilder: FormBuilder,
  ) { 
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      title:        ['', [Validators.required]],
      description:  [''],
      note:         [''],
    });

    this.table = this.formBuilder.group({
      rcFrom:     ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],        
      rcTo:       ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],      
      ssER:       ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],      
      ssEE:       ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],           
      ecER:       ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],       
    });
  };

  ngOnInit() {
    // this.getActivePHTable();
    if(this.status == 3){
      this.isActive=true;
    }
    if(this.status == 4){
      this.isActive=true;
      this.table = this.formBuilder.group({
        rcFrom:     [this.modalData.rcFrom, [Validators.required, Validators.min(0), Validators.max(999999999)]],        
        rcTo:       [this.modalData.rcTo, [Validators.required, Validators.min(0), Validators.max(999999999)]],      
        ssER:       [this.modalData.ssER, [Validators.required, Validators.min(0), Validators.max(999999999)]],      
        ssEE:       [this.modalData.ssEE, [Validators.required, Validators.min(0), Validators.max(999999999)]],           
        ecER:       [this.modalData.ecER, [Validators.required, Validators.min(0), Validators.max(999999999)]],   
      });
    }
  }

  proceed(){
    // disable active table
    this.sgs.request('post', 'sssTable/updateTableStatus', null, async (res) => {
      if(res){
        this.sgs.request('post', 'sssTable/addNewTable', this.form.value, async (res) => {
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
      this.sgs.request('post', 'sssTable/addDataToTable', { table: this.table.value }, async (res) => {
        if(res.success){
          this.sgs.Toaster('success', 'Success', 'New Data has been added to the table.');
          this.createForm();
        }
      })
    }
    if(this.status == 4){
      this.sgs.request('post', 'sssTable/updateDataFromTable', {id: this.modalData._id, table: this.table.value}, async (res) => {
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
