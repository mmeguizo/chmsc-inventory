import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'ngx-update-employee-field',
  templateUrl: './update-employee-field.component.html',
  styleUrls: ['./update-employee-field.component.scss']
})
export class UpdateEmployeeFieldComponent implements OnInit {
  public temp: any = [];
  public basicInfo : boolean = false;
  public contactInfo : boolean = false;
  public employementInfo : boolean = false;
  public educationBackground : boolean = false;
  public documents : boolean = false;






  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService
  ) { }

  ngOnInit(): void {
  }

  basicIcon = 'fas fa-plus';
  contactIcon = 'fas fa-plus';
  employmentIcon  = 'fas fa-plus';
  eduIcon  = 'fas fa-plus';
  docuIcon  = 'fas fa-plus';



  viewBasicInfo() {
    if (this.basicInfo == false) {
      this.basicInfo = true;
      this.basicIcon = 'fas fa-minus';
    } else {
      this.basicInfo = false;
      this.basicIcon = 'fas fa-plus'
    }
  }
  viewContactInfo(){
    if (this.contactInfo == false) {
      this.contactInfo = true;
      this.contactIcon = 'fas fa-minus';
    } else {
      this.contactInfo = false;
      this.contactIcon = 'fas fa-plus'
    }
  }
  employmentInfo(){
    if (this.employementInfo == false) {
      this.employementInfo = true;
      this.employmentIcon = 'fas fa-minus';
    } else {
      this.employementInfo = false;
      this.employmentIcon = 'fas fa-plus'
    }
  }
  eduBackground(){
    if (this.educationBackground == false) {
      this.educationBackground = true;
      this.eduIcon = 'fas fa-minus';
    } else {
      this.educationBackground = false;
      this.eduIcon = 'fas fa-plus'
    }
  }
  documentsId(){
    if (this.documents == false) {
      this.documents = true;
      this.docuIcon = 'fas fa-minus';
    } else {
      this.documents = false;
      this.docuIcon = 'fas fa-plus'
    }
  }

  addItem(event) {
    let indParticulars = {
      fieldName: event.target.value
    }

    if (event.target.checked == true) {
      this.temp.push(indParticulars);
    } else {
      let index = _.findIndex(this.temp, (data) => {
        return data.fieldName == indParticulars.fieldName;
      });
      if (index !== -1) {
        this.temp.splice(index, 1);
      }
    }
  }

  update(){
    this.sgs.request('post', 'empRequired_field/addEmpReq', {temp: this.temp}, async(res) => {
      if(res.success){
        this.sgs.showToaster('success','Required field has been updated.','Success', 2000, 'bottom-right');
        this.closeModal()
      }

    })
  }
  closeModal() {
    this.activeModal.close();
  }
}
