import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { async } from 'q';

@Component({
  selector: 'ngx-educational-background',
  templateUrl: './educational-background.component.html',
  styleUrls: ['./educational-background.component.scss']
})
export class EducationalBackgroundComponent implements OnInit {

  data;
  dataID;
  uid;
  form;

  constructor(
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public sgs: SharedGlobalService
  ) { 
    this.createEducationalForm();
  }

  createEducationalForm(){
    this.form = this.formBuilder.group({
      education:            ['', [Validators.required]],
      school:               ['', [Validators.required]],
      location:             [''],
      schoolYear:           ['', [Validators.required]],
      courseOfStudy:        [''],
      degree:               ['']
    })
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      education:            [this.data.education, [Validators.required]],
      school:               [this.data.school, [Validators.required]],
      location:             [this.data.location],
      schoolYear:           [this.data.schoolYear, [Validators.required]],
      courseOfStudy:        [this.data.courseOfStudy],
      degree:               [this.data.degree]
    })
    this.dataID = this.data._id;
  }

  update(form){
    this.sgs.request('post', 'employee/updateEduc', {objID: this.dataID, uid: this.uid, form: form.value}, async (res) => {
      if(res.success){
        this.closeModal();
        this.sgs.Toaster('success', 'Success', 'Employee educational background has been modified.')
      }
    });
  }


  closeModal(){
    this.activeModal.close();
  }

}
