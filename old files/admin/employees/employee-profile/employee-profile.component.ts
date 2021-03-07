import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as _ from 'lodash';
import { EducationalBackgroundComponent } from '../../modals/educational-background/educational-background.component';

@Component({
  selector: 'ngx-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  form;
  employment: FormGroup;
  emergency: FormGroup;
  documents: FormGroup;
  educationalForm: FormGroup;
  educational = [];
  user: any;
  loading = true;
  employmentLength;
  theID : Number;

  showEmergencyInfo = false;
  showEmploymentInfo = false;
  showEducationalInfo = false;
  isAdd = true;
 thisMainID : any;

  socketInstance;
  allPosition: any;
  constructor(
    public sgs: SharedGlobalService,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public ngbModal: NgbModal
  ) {
    this.createForm();
    this.createEducationalForm();
    this.socketInstance = sgs.ResponseSocket('employee').subscribe( emitted => {
      this.getUser();
    })
    this.thisMainID = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.thisMainID = this.route.snapshot.params['id'];
    this.getUser();
    this.getAllPosition();
    console.log('this.getUser',this.route.snapshot.params['id']);

  }

  createForm(){
    this.form = this.formBuilder.group({
      uid:                  [0],
      prefix:               ['', [Validators.required]],
      nickName:             ['', [Validators.required]],
      fname:                ['', [Validators.required]],
      lname:                ['', [Validators.required]],
      mname:                ['', [Validators.required]],
      email:                [''],
      mobile:               [''],
      telephone:            [''],
      gender:               ['', [Validators.required]],
      dateOfBirth:          ['', [Validators.required]],
      maritalStatus:        ['', [Validators.required]],
      imageURL:             [''],
      streetAddress:        ['', [Validators.required]],
      unitNumber:           [''],
      city:                 ['', [Validators.required]],
      province:             ['', [Validators.required]],
      zipCode:              ['', [Validators.required]],
      country:              ['', [Validators.required]],
      dateHired:            ['', [Validators.required]],
      sss:                  [''],
      philHealth:           [''],
      pagIbig:              [''],
      tin:                  [''],
    });
    this.employment = this.formBuilder.group({
      position:             ['', [Validators.required]],
      employmentType:       ['', [Validators.required]],
      monthlySalary:        ['', [Validators.required]],
      hourlyRate:           ['', [Validators.required]],
      dateOfPromotion:      [''],
      effectivity:          ['']
    });
    this.emergency = this.formBuilder.group({
      firstName:            [''],
      lastName:             [''],
      middleName:           [''],
      streetAddress:        [''],
      unitNumber:           [''],
      city:                 [''],
      phoneNumber:          [''],
      mobile:               [''],
      telephone:            [''],
      relationship:         [''],
    });
    this.documents = this.formBuilder.group({
          docType:          [''],
          docURL:           [''],
    });
  }

  createEducationalForm(){
    this.educationalForm = this.formBuilder.group({
      education:            ['', [Validators.required]],
      school:               ['', [Validators.required]],
      location:             [''],
      schoolYear:           ['', [Validators.required]],
      courseOfStudy:        [''],
      degree:               ['']
    })
  }

  getUser(){

    let uid : Number;

    this.sgs.request('get', 'user/getUserInfo', {id: this.route.snapshot.params['id'] }, async (res) => {


      this.theID = res.data.id;


      if(res.success){
        this.loading = false;
        this.user = res.data;
        this.sgs.request('get', 'employee/getEmployee', {uid: res.data.id}, async (emp) => {


          if(emp.success){


            if(emp.data){



              this.isAdd = false;
              this.employmentLength = emp.data.employment.length;
              this.form = this.formBuilder.group({
                uid:                  [res.data.id],
                prefix:               [emp.data.prefix, [Validators.required]],
                nickName:             [emp.data.nickName, [Validators.required]],
                fname:                [res.data.fname, [Validators.required]],
                lname:                [res.data.lname, [Validators.required]],
                mname:                [res.data.mname, [Validators.required]],
                email:                [res.data.email, [Validators.required]],
                mobile:               [emp.data.mobile],
                telephone:            [emp.data.telephone],
                gender:               [emp.data.gender, [Validators.required]],
                dateOfBirth:          [moment(emp.data.dateOfBirth).format("MM-DD-YYYY"), [Validators.required]],
                maritalStatus:        [emp.data.maritalStatus, [Validators.required]],
                imageURL:             [emp.data.imageURL],
                streetAddress:        [emp.data.streetAddress, [Validators.required]],
                unitNumber:           [emp.data.unitNumber],
                city:                 [emp.data.city, [Validators.required]],
                province:             [emp.data.province, [Validators.required]],
                zipCode:              [emp.data.zipCode, [Validators.required]],
                country:              [emp.data.country, [Validators.required]],
                dateHired:            [moment(emp.data.dateHired).format("MM-DD-YYYY"), [Validators.required]],
                sss:                  [emp.data.sss],
                philHealth:           [emp.data.philHealth],
                pagIbig:              [emp.data.pagIbig],
                tin:                  [emp.data.tin],
              });
              let employment = _.filter(emp.data.employment, (result) => {
                return result['status'] == true;
              });
              this.employment = this.formBuilder.group({
                  _id:                 [employment[0]._id],
                  position:            [employment[0].position, [Validators.required]],
                  employmentType:      [employment[0].employmentType, [Validators.required]],
                  monthlySalary:       [employment[0].monthlySalary, [Validators.required]],
                  hourlyRate:          [employment[0].hourlyRate, [Validators.required]],
                  dateOfPromotion:     [employment[0].dateOfPromotion],
                  effectivity:         [employment[0].effectivity]
              });
              this.emergency = this.formBuilder.group({
                firstName:            [emp.data.emergency[0].firstName],
                lastName:             [emp.data.emergency[0].lastName],
                middleName:           [emp.data.emergency[0].middleName],
                streetAddress:        [emp.data.emergency[0].streetAddress],
                unitNumber:           [emp.data.emergency[0].unitNumber],
                city:                 [emp.data.emergency[0].city],
                phoneNumber:          [emp.data.emergency[0].phoneNumber],
                mobile:               [emp.data.emergency[0].mobile],
                telephone:            [emp.data.emergency[0].telephone],
                relationship:         [emp.data.emergency[0].relationship],
              });
              this.educational = emp.data.educational;
            }else{



              this.isAdd = true;
              this.form = this.formBuilder.group({
                uid:                  [res.data.id],
                prefix:               ['', [Validators.required]],
                nickName:             ['', [Validators.required]],
                fname:                [res.data.fname],
                lname:                [res.data.lname],
                mname:                [res.data.mname],
                email:                [res.data.email],
                mobile:               [''],
                telephone:            [''],
                gender:               ['', [Validators.required]],
                dateOfBirth:          ['', [Validators.required]],
                maritalStatus:        ['', [Validators.required]],
                imageURL:             [''],
                streetAddress:        ['', [Validators.required]],
                unitNumber:           [''],
                city:                 ['', [Validators.required]],
                province:             ['', [Validators.required]],
                zipCode:              ['', [Validators.required]],
                country:              ['', [Validators.required]],
                dateHired:            ['', [Validators.required]],
                sss:                  [''],
                philHealth:           [''],
                pagIbig:              [''],
                tin:                  [''],
              });
            }
          }
        });
      }
    });
  }



  emergencyIcon = 'fas fa-plus';
  employmentIcon = 'fas fa-plus';
  educationalIcon = 'fas fa-plus';
  viewEmergency(){
    if(this.showEmergencyInfo == false){
      this.showEmergencyInfo = true;
      this.emergencyIcon = 'fas fa-minus';
    }else{
      this.showEmergencyInfo = false;
      this.emergencyIcon = 'fas fa-plus'
    }
  }

  viewEmployment(){
    if(this.showEmploymentInfo == false){
      this.showEmploymentInfo = true;
      this.employmentIcon = 'fas fa-minus';
    }else{
      this.showEmploymentInfo = false;
      this.employmentIcon = 'fas fa-plus'
    }
  }

  viewEducationalBackground(){
    if(this.showEducationalInfo == false){
      this.showEducationalInfo = true;
      this.educationalIcon = 'fas fa-minus';
    }else{
      this.showEducationalInfo = false;
      this.educationalIcon = 'fas fa-plus'
    }
  }

  addEducationalBackground(educationalForm){
    this.educational.push(educationalForm.value);
    this.createEducationalForm();
   }

  editEduc(uid, data){
    const activeModal = this.ngbModal.open(EducationalBackgroundComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
    activeModal.componentInstance.uid = uid;
    activeModal.componentInstance.data = data;
  }

  removeEduc(form, id){
    var answer = confirm("Do you want to remove this information?")
    if (answer) {
      this.sgs.request('post', 'employee/removeEduc', {uid: form.value.uid, educID: id}, async (res) => {
        if(res.success){
          this.sgs.Toaster('success', 'Success', 'Educational information has been remove.');
          this.getUser();
        }
      })
    }
  }

  //temp array of education
  removeEducArray(form){
    var answer = confirm("Do you want to remove this information?")
    if(answer){
      const index: number = this.educational.indexOf(form);
      if (index !== -1) {
          this.educational.splice(index, 1);
      }
    }
  }
  //temp array of education



  submit(form, emergency, employment, educationalForm?){
    //set uid manually
    form.value.uid = this.theID;

    this.sgs.request('post', 'employee/addEmployee', {form: form.value, emergency: emergency.value, employment: employment.value, educational: this.educational}, async (res) => {

      if(res.success){
        this.sgs.Toaster('success', 'Congrats!', 'You have successfully update the employee information.');
        this.sgs.back();
      }
    })


  }

  update(form, emergency, employment){

    console.log('this is update');

    //set uid manually
    form.value.uid = this.theID;

    employment.value.dateOfPromotion = form.value.dateHired;
    employment.value.effectivity = form.value.dateHired;
    this.sgs.request('post', 'employee/updateEmployee', {form: form.value, emergency: emergency.value, educational: this.educational}, async (res) => {
      if(res.success){
        this.sgs.Toaster('success', 'Congrats!', 'You have successfully update the employee information.');
        //update employment first array only
        this.sgs.request('post', 'employee/updateEmployment', {uid: form.value.uid, form: employment.value}, async (res) => {})
        //update user information if any
        this.sgs.request('post', 'user/updateUserEmployee', {form: form.value}, async (res) => {
        })
      }
      this.sgs.goto('admin/employees')

    })


  }


  getAllPosition(){
    this.sgs.request('get', 'position/getAllPosition', {}, async (res) => {
      if(res.success) {
        this.allPosition = res.data;
      }
    })
  }



  ngOnDestroy(){
    this.socketInstance.unsubscribe();
  }
}
