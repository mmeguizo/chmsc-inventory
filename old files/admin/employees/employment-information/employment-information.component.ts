import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as _ from 'lodash';
// import { EducationalBackgroundComponent } from '../../../hr/modals/educational-background/educational-background.component';
// import { EmploymentPromotionComponent } from '../../../hr/modals/employment-promotion/employment-promotion.component';
// import { TerminateEmployeeComponent } from '../../../hr/modals/terminate-employee/terminate-employee.component';

@Component({
  selector: 'ngx-employment-information',
  templateUrl: './employment-information.component.html',
  styleUrls: ['./employment-information.component.scss']
})
export class EmploymentInformationComponent implements OnInit {

  loading = true;
  data;
  profile;
  employment;
  curEmployment

  sortBy = '_id';
  sortOrder = 'desc';

  socketInstance;
  noData = false;
  constructor(
    public sgs: SharedGlobalService,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public ngbModal: NgbModal
  ) {
    this.socketInstance = sgs.ResponseSocket('employeePromotion').subscribe( emitted => {
      this.getUser();
    })
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.sgs.request('get', 'user/getUserInfo', {id: this.route.snapshot.params['id'] }, async (response) => {
      if(response.success){
        this.loading = false;
        this.data = response.data;
        this.sgs.request('get', 'employee/getEmployee', {uid: response.data.id}, async (res) => {
          if(res.success){
            if(res.data == null){
              this.noData = true;
            }else{
              this.noData = false;
              this.profile = res.data;
              this.employment = res.data.employment;
              console.log(res.data.employment)
              this.profile.yearsInService = moment().diff(res.data.dateHired, 'years',false);
              this.profile.age = moment().diff(res.data.dateOfBirth, 'years',false);
              res.data.employment.map((x, i) => {
                this.sgs.request('get', 'user/getSecuredUser', {uid: x.assigned}, async (data) => {
                  this.employment[i].assigned = data.data[0].lname;
                });
              });
            //get current employment from employee information
              this.sgs.request('get', 'employee/getCurrentEmploymentInformation', {uid: response.data.id}, async (curResponse) => {
                if(curResponse.success){
                  this.curEmployment = curResponse.data[0].employment;
                }
              })
            }
          }
        })
      }
   });
  }

  // promote(){
  //   const activeModal = this.ngbModal.open(EmploymentPromotionComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height' });
  //   activeModal.componentInstance.uid = this.data.id;
  // }

  // terminate(terminate?){
  //   const activeModal = this.ngbModal.open(TerminateEmployeeComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
  //   activeModal.componentInstance.uid = this.data.id;
  // }

  ngOnDestroy(){
    this.socketInstance.unsubscribe();
  }
}

