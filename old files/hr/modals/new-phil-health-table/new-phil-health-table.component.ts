import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'ngx-new-phil-health-table',
  templateUrl: './new-phil-health-table.component.html',
  styleUrls: ['./new-phil-health-table.component.scss']
})
export class NewPhilHealthTableComponent implements OnInit {

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
      percentage:   ['', Validators.required],
    });

    this.table = this.formBuilder.group({
      mbsFrom:    ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],        
      mbsTo:      ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],      
      mpFrom:     ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],      
      mpTo:       ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],      
      psFrom:     ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],      
      psTo:       ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],       
      esFrom:     ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],    
      esTo:       ['', [Validators.required, Validators.min(0), Validators.max(999999999)]], 
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
        mbsFrom:    [this.modalData.mbsFrom, [Validators.required, Validators.min(0), Validators.max(999999999)]],        
        mbsTo:      [this.modalData.mbsTo,   [Validators.required, Validators.min(0), Validators.max(999999999)]],      
        mpFrom:     [this.modalData.mpFrom,  [Validators.required, Validators.min(0), Validators.max(999999999)]],      
        mpTo:       [this.modalData.mpTo,    [Validators.required, Validators.min(0), Validators.max(999999999)]],      
        psFrom:     [this.modalData.psFrom,  [Validators.required, Validators.min(0), Validators.max(999999999)]],      
        psTo:       [this.modalData.psTo,    [Validators.required, Validators.min(0), Validators.max(999999999)]],       
        esFrom:     [this.modalData.esFrom,  [Validators.required, Validators.min(0), Validators.max(999999999)]],    
        esTo:       [this.modalData.esTo,    [Validators.required, Validators.min(0), Validators.max(999999999)]], 
      });
    }
  }

  // getActivePHTable(){
  //   this.sgs.request('get', 'phtable/getActivePHTable', null, async (res) => {
  //     if(res.success){
  //       this.isActive=true;
  //     }else{
  //       this.isActive=false
  //     }
  //   })
  // }

  addArray(){

  }

  proceed(){
    // disable active table
    this.sgs.request('post', 'phTable/updateTableStatus', null, async (res) => {
      if(res){
        this.sgs.request('post', 'phtable/addNewTable', this.form.value, async (res) => {
          if(res.success){
            this.isActive = true;
            this.sgs.Toaster('success', 'Success', 'New table has been created.');
          }
        });
      }
    });
  }

  save(){ 
    if(this.status == 3){
      this.sgs.request('post', 'phTable/addDataToTable', { table: this.table.value }, async (res) => {
        if(res.success){
          this.sgs.Toaster('success', 'Success', 'New Data has been added to the table.');
          this.createForm();
        }
      })
    }
    if(this.status == 4){
      this.sgs.request('post', 'phTable/updateDataFromTable', {id: this.modalData._id, table: this.table.value}, async (res) => {
        if(res.success){
          this.sgs.Toaster('success', 'Success', 'The data has been updated successfully.');
          this.closeModal();
        }
      })
    
    }


  } 

  closeModal(){
    this.activeModal.close();
  }
}
