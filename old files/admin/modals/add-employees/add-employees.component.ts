import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { UpdateEmployeeFieldComponent } from '../update-employee-field/update-employee-field.component';
import { async } from 'rxjs/internal/scheduler/async';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';
import { EducationalBackgroundComponent } from '../../modals/educational-background/educational-background.component';



@Component({
  selector: 'ngx-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss']
})
export class AddEmployeesComponent implements OnInit {


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
  id;
  showEmergencyInfo = false;
  showEmploymentInfo = false;
  showEducationalInfo = false;
  isAdd = true;

  socketInstance;
  allPosition: any;
  constructor(
    public sgs: SharedGlobalService,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public ngbModal: NgbModal,
    public activeModal: NgbActiveModal,
  ) {
    this.createForm();
    this.createEducationalForm();
    this.socketInstance = sgs.ResponseSocket('employee').subscribe( emitted => {
      this.getUser();
    })
  }

  ngOnInit() {
    this.getUser();
    this.getAllPosition();
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

    this.sgs.request('get', 'user/getUser', {id: this.id }, async (res) => {


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

    console.log('submit');
    console.log(form,emergency,employment,educationalForm);


    //set uid manually
    form.value.uid = this.theID;

    this.sgs.request('post', 'employee/addEmployee', {form: form.value, emergency: emergency.value, employment: employment.value, educational: this.educational}, async (res) => {

      if(res.success){
       this.sgs.showToaster('success', 'You have successfully updated the Employee information.', 'Success', 2000, 'bottom-right');
       this.closeModal();
      }else{
       this.sgs.showToaster('warning', 'Failed to updated the Employee information.', 'Oops', 2000, 'bottom-right');
      }
    })


  }

  update(form, emergency, employment){
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
        this.sgs.request('post', 'user/updateUserEmployee', {form: form.value}, async (res) => {})
      }
    })


  }

  ngOnDestroy(){
    this.socketInstance.unsubscribe();
  }

  closeModal() {
    this.activeModal.close();
  }

  getAllPosition(){
    this.sgs.request('get', 'position/getAllPosition', {}, async (res) => {
      if(res.success) {
        this.allPosition = res.data;
      }
    })
  }

  // public form: any;
  // public imageInfo: any;
  // public imageLoader = false;
  // public elEventListenerActive: boolean;
  // public employment: any;
  // public emergency: any;
  // public educationalForm: any;
  // public documentForm: any;
  // public documentArray = []
  // public emergencyContact : any = []

  // public educational = [];
  // public user: any;
  // public loading = true;
  // public employmentLength;

  // public showEmergencyInfo : boolean = false;
  // public showEmploymentInfo : boolean = false;
  // public showEducationalInfo = false;
  // public showDocumentInfo = false;
  // public isAdd = true;
  // public documents = [];

  // public socketInstance;
  // public positions: any;
  // public positionSocketInstance: any;
  // public requiredField: any=[];

  // public formChecker: boolean = true;
  // public emergencyChecker: any;

  // public prefix : boolean
  // public nickName : boolean
  // public fname : boolean
  // public lname : boolean
  // public mname : boolean
  // public gender : boolean
  // public dateOfBirth : boolean
  // public maritalStatus : boolean
  // public streetAddress : boolean
  // public barangay : boolean
  // public city : boolean
  // public province : boolean
  // public zipCode : boolean
  // public country : boolean
  // public fullName : boolean
  // public emergencyAddress : boolean
  // public dateHired : boolean
  // public position : boolean
  // public employmentType : boolean
  // public monthlySalary : boolean
  // public hourlyRate : boolean
  // public mobile : boolean
  // public telephone : boolean
  // public email	 : boolean
  // public emergencyMobile	 : boolean
  // public emergencyTelephone	 : boolean
  // public emergencyRelationship	 : boolean




  // public education : boolean
  // public school : boolean
  // public location : boolean
  // public schoolYear : boolean
  // public degree : boolean


  // public idName : boolean
  // public dateReleased : boolean
  // public dateExpire : boolean







  // constructor(
  //   public activeModal: NgbActiveModal,
  //   public formBuilder: FormBuilder,
  //   public sgs: SharedGlobalService,
  //   public ngbModal: NgbModal,
  // ) {
  //   // this.createForm();
  //   // this.socketInstance = sgs.ResponseSocket('addEmpReq').subscribe( emitted => {
  //   //   this.getRequiredFields();
  //   // });
  //  }


  // ngOnInit(): void {
  //   // this.getRequiredFields()
  //   // this.getAllPosition();


  // }


//   createForm() {
//     this.form = this.formBuilder.group({
//       uid: [''],
//       prefix: [''],
//       nickName: ['', [Validators.required]],
//       fname: ['', [Validators.required]],
//       lname: ['', [Validators.required]],
//       mname: ['', [Validators.required]],
//       email: ['',[Validators.required]],
//       mobile: ['',[Validators.required]],
//       telephone: ['',[Validators.required]],
//       gender: ['', [Validators.required]],
//       dateOfBirth: ['', [Validators.required]],
//       maritalStatus: ['', [Validators.required]],
//       imageURL: [''],
//       streetAddress: ['', [Validators.required]],
//       unitNumber: [''],
//       barangay: ['', [Validators.required]],
//       city: ['', [Validators.required]],
//       province: ['', [Validators.required]],
//       zipCode: ['', [Validators.required]],
//       country: ['Philippines'],

//     emergencyContact : this.formBuilder.group({
//         fullName: ['', [Validators.required]],
//         address: ['', [Validators.required]],
//         mobile: ['', [Validators.required]],
//         telephone: ['', [Validators.required]],
//         relationship: ['', [Validators.required]],
//       }),
//       employmentDetails : this.formBuilder.group({
//         dateHired: ['', [Validators.required]],
//         // sss: [''],
//         // philHealth: [''],
//         // pagIbig: [''],
//         // tin: [''],
//         position: ['', [Validators.required]],
//         employmentType: ['', [Validators.required]],
//         monthlySalary: ['', [Validators.required]],
//         hourlyRate: ['', [Validators.required]],
//       }),
//       educationDetails : this.formBuilder.group({
//         education: ['', [Validators.required]],
//         school: ['', [Validators.required]],
//         location: [''],
//         schoolYear: ['', [Validators.required]],
//         courseOfStudy: [''],
//         degree: ['']
//       }),
//       documentDetails : this.formBuilder.group({
//         idName: ['', [Validators.required]],
//         dateReleased: ['', [Validators.required]],
//         dateExpire: ['', [Validators.required]],
//       })

//     })


//   }


//   getRequiredFields(){
//     this.emergencyMobile = false;
//     this.emergencyTelephone = false;
//     this.emergencyRelationship = false;
//     this.formChecker = false;
//     this.employment = false;
//     this.emergency = false;
//     this.mobile = false;
//     this.email = false;
//     this.telephone = false;
//     this.documentForm = false;
//     this.educationalForm = false;
//     this.prefix = false;
//     this.nickName = false;
//     this.fname= false;
//     this.mname = false;
//     this.lname = false;
//     this.gender = false;
//     this.dateOfBirth = false;
//     this.maritalStatus = false;
//     this.streetAddress = false;
//     this.barangay = false;
//     this.city = false;
//     this.province = false;
//     this.zipCode = false;
//     this.country = false;
//     this.fullName = false
//     this.emergencyAddress = false
//     this.dateHired = false;
//     this.position = false;
//     this.employmentType = false;
//     this.monthlySalary = false;
//     this.hourlyRate = false
//     this.education  = false;
//     this.school  = false;
//     this.location  = false;
//     this.schoolYear  = false;
//     this.degree  = false
//     this.dateReleased = false
//     this.idName = false
//     this.dateExpire = false
//     this.sgs.request('get', 'empRequired_field/getRequiredFields', {}, async (res) => {


//       if(res.success) {
//         this.requiredField = res.data[0].fields;
//         this.requiredField.map( field => {
//           let fieldName = field.fieldName;
//           // console.log(fieldName);
//             if(fieldName == 'prefix'){
//               this.form.get('prefix').setValidators(Validators.required)
//               this.prefix = true;
//             }
//             else if (fieldName == 'firstname'){
//               this.fname= true;
//             }
//             else if (fieldName == 'middlename'){
//               this.mname = true;
//             }
//             else if (fieldName == 'lastname'){
//               this.lname = true;
//             }
//             else if (fieldName == 'nickname'){
//               this.nickName = true;
//             }
//             else if (fieldName == 'gender'){
//               this.gender = true;
//             }
//             else if (fieldName == 'dateofbirth'){
//               this.dateOfBirth = true;
//             }
//             else if (fieldName == 'address'){
//               this.streetAddress = true;
//             }
//             else if (fieldName == 'barangay'){
//               this.barangay = true;
//             }
//             else if (fieldName == 'city'){
//               this.city = true;
//             }
//             else if (fieldName == 'province'){
//               this.province = true;
//             }
//             else if (fieldName == 'country'){
//               this.country = true;
//             }
//              else if (fieldName == 'zipcode'){
//               this.zipCode = true;
//             }
//             else if (fieldName == 'mobile'){
//               this.mobile = true;
//             }
//             else if (fieldName == 'telephone'){
//               this.telephone = true;
//             }
//             else if (fieldName == 'email'){
//               this.email = true;
//             }
//             else if (fieldName == 'emergencyFullname'){
//               this.emergency = true;
//               this.fullName = true;
//             }
//             else if (fieldName == 'emergencyAddress'){
//               this.emergency = true;
//               this.emergencyAddress = true;
//             }
//             else if (fieldName == 'emergencyMobile'){
//               this.emergency = true;
//               this.emergencyMobile = true;
//             }
//             else if (fieldName == 'emergencyTelephone'){
//               this.emergency = true;
//               this.emergencyTelephone = true;
//             }
//             else if (fieldName == 'emergencyRelationship'){
//               this.emergency = true;
//               this.emergencyRelationship = true;
//             }
//             else if (fieldName == 'datehired'){
//               this.dateHired = true;
//               this.employment = true;
//             }
//             else if (fieldName == 'position'){
//               this.position = true;
//               this.employment = true;
//             }
//             else if (fieldName == 'employmentType'){
//               this.employmentType = true;
//               this.employment = true;
//             }
//             else if (fieldName == 'monthlySalary'){
//               this.employment = true;
//               this.monthlySalary = true;
//             }
//             else if (fieldName == 'hourlyRate'){
//               this.hourlyRate = true
//               this.employment = true;
//             }
//             else if (fieldName == 'education'){
//               this.educationalForm = true;
//               this.education  = true;
//             }
//             else if (fieldName == 'schoolName'){
//               this.educationalForm = true;
//               this.school  = true;
//             }
//             else if (fieldName == 'schoolYear'){
//               this.educationalForm = true;
//               this.schoolYear  = true;
//             }

//             else if (fieldName == 'typeOfIds'){
//               this.documentForm = true;
//               this.idName = true
//             }
//             else if (fieldName == 'dateReleased'){
//               this.documentForm = true;
//               this.dateReleased = true
//             }
//             else if (fieldName == 'dateExpire'){
//               this.documentForm = true;
//               this.dateExpire = true
//             }

//       //     if(fieldName == 'form'){
//       //       this.formChecker = true
//       //       this.prefix = true;
//       //       this.nickName = true;
//       //       this.fname= true;
//       //       this.mname = true;
//       //       this.lname = true;
//       //       this.gender = true;
//       //       this.dateOfBirth = true;
//       //       this.maritalStatus = true;
//       //       this.streetAddress = true;
//       //       this.barangay = true;
//       //       this.city = true;
//       //       this.province = true;
//       //       this.zipCode = true;
//       //       this.country = true;
//       //     }
//       //      else if(fieldName == 'employment'){
//       //       this.employment = true;
//       //       this.dateHired = true;
//       //       this.position = true;
//       //       this.employmentType = true;
//       //       this.monthlySalary = true;
//       //       this.hourlyRate = true
//       //     }
//       //      else if(fieldName == 'emergency'){
//       //       this.emergency = true;
//       //       this.fullName = true
//       //       this.emergencyAddress = true
//       //     }
//       //      else if(fieldName == 'documentForm'){
//       //       this.documentForm = true;
//       //       this.dateReleased = true
//       //       this.idName = true
//       //       this.dateExpire = true
//       //     }
//       //      else if(fieldName == 'educationForm'){
//       //       this.educationalForm = true;
//       //       this.education  = true;
//       //       this.school  = true;
//       //       this.location  = true;
//       //       this.schoolYear  = true;
//       //       this.degree  = true
//       //     }
//         });
//       }else{
//         this.requiredField = [];
//       }



//     });

//   }


//   emergencyIcon = 'fas fa-plus';
//   employmentIcon = 'fas fa-plus';
//   educationalIcon = 'fas fa-plus';
//   documentIcon = 'fas fa-plus';
//   viewEmergency() {
//     if (this.showEmergencyInfo == false) {
//       this.showEmergencyInfo = true;
//       this.emergencyIcon = 'fas fa-minus';
//     } else {
//       this.showEmergencyInfo = false;
//       this.emergencyIcon = 'fas fa-plus'
//     }
//   }

//   viewEmployment() {
//     if (this.showEmploymentInfo == false) {
//       this.showEmploymentInfo = true;
//       this.employmentIcon = 'fas fa-minus';
//     } else {
//       this.showEmploymentInfo = false;
//       this.employmentIcon = 'fas fa-plus'
//     }
//   }

//   viewEducationalBackground() {
//     if (this.showEducationalInfo == false) {
//       this.showEducationalInfo = true;
//       this.educationalIcon = 'fas fa-minus';
//     } else {
//       this.showEducationalInfo = false;
//       this.educationalIcon = 'fas fa-plus'
//     }
//   }

//   viewDocuments() {
//     if (this.showDocumentInfo == false) {
//       this.showDocumentInfo = true;
//       this.documentIcon = 'fas fa-minus';
//     } else {
//       this.showDocumentInfo = false;
//       this.documentIcon = 'fas fa-plus';
//     }

//   }

//   getAllPosition() {
//     this.sgs.request('get', 'position/getAllPosition', {}, response => {
//       if(response.success) {
//         this.positions = response.data;
//       }
//     });
//   }

//   addEducationalBackground(educationalForm) {
//     this.educational.push(educationalForm);
//     this.form.patchValue({
//       educationDetails : {
//       courseOfStudy : '',
//       degree : '',
//       education : '',
//       location : '',
//       school: '',
//       schoolYear : ''
//       }
//     })

//   }
//   addEmergencyContact(contact){
//     this.emergencyContact.push(contact)

//     this.form.patchValue({
//       emergencyContact : {
//         fullName:  '',
//         address:  '',
//         mobile: '',
//         telephone: '',
//         relationship: '',

//       }
//     })
//   }


//   closeModal() {
//     this.activeModal.close();
//   }

//   updateEmpField(){
//     this.sgs.Modal(
//       {},
//       {component : UpdateEmployeeFieldComponent, size : 'md'}
//     )
//   }

//   addEmployee(){
//     this.sgs.request('post', 'employee/addNewEmployee', {
//       form : this.form.value,
//       document : this.documentArray,
//       education : this.educational,
//       emergencyContact : this.emergencyContact
//     }, async(res) => {
//       if(res.success){
//         this.sgs.showToaster('success', 'New employee has been added.', 'Success', 2000, 'bottom-right');
//         this.closeModal()
//       }


//     })
//   }
//   editEduc(){

//   }
//   removeEduc(i){
//     this.sgs.Modal({
//       header : `System Message`,
//       content :  `Are you sure you want to delete education background ?`,
//       type :'confirmation',
//       buttonName: 'close'
//     },{size : 'sm'})
//     .confirm.subscribe(response => {
//       if(response){
//         this.educational.splice(i, 1)
//         this.sgs.showToaster('success', 'Education background has been deleted.', 'Success', 2000, 'bottom-right');

//       }

//     })
//   }

//   openFile(ev, id) {
//     let file,
//       el = document.getElementById(id);
//     el.click();
//     let handler = (fc) => {
//       try {
//         let fileList: any;
//         let fd = new FormData();
//         if (fc.target['files'][0]['name'] !== undefined) {
//           fileList = fc.target;
//           let file: File = fileList.files[0];
//           fd.append('degree_attachment', file, file.name);
//           this.sgs.submitting = true;
//           this.sgs.request('post', 'xfile/empDocuments', fd, response => {
//             if (response.success) {
//               this.elEventListenerActive = false;
//               this.imageInfo = {
//                 fileName: file.name,
//                 link: response.data.name,
//                 type: file.type
//               }


//               el.removeEventListener('change', handler);
//             } else {
//               el.removeEventListener('change', handler);
//             }
//           });
//         } else {
//           ev.target.innerHTML = 'Browse';
//           this.elEventListenerActive = false;
//           el.removeEventListener('change', handler);
//         }
//       } catch (e) {
//         ev.target.innerHTML = 'Browse';
//         this.elEventListenerActive = false;
//         el.removeEventListener('change', handler);
//       }
//     }
//     if (!this.elEventListenerActive) {
//       el.addEventListener('change', handler);
//       this.elEventListenerActive = true;
//   }
// }

// removeImage(data: string) {
//   if (data) {
//     this.sgs.request('post', 'xfile/deleteEmpDocument', { link: data }, async (response) => {
//     });
//     this.sgs.showToaster('success', 'Image has been removed.','Success', 2000, 'bottom-right');
//     this.imageInfo = undefined;
//   }
// }
// addDocBackground() {
//   this.documents.push(
//     {
//       fileName: this.imageInfo.fileName,
//       link: this.imageInfo.link,
//       type: this.imageInfo.type
//     }
//   );
//   this.sgs.showToaster('success', 'Document has been added.', 'Success', 2000, 'bottom-right');
//   this.imageInfo = undefined;
// }
// save(documents){
//   this.documentArray.push(
//     {
//       idName : documents.idName,
//       dateReleased : documents.dateReleased,
//       dateExpire : documents.dateExpire,
//       image : this.documents
//     }
//   )
//   this.documents = []
//   this.form.patchValue({
//     documentDetails : {
//       idName : '',
//       dateReleased : '',
//       dateExpire : '',
//     }

//   })

// }
// removeId(i){
//   this.sgs.Modal({
//     header : `System Message`,
//     content :  `Are you sure you want to delete document?`,
//     type :'confirmation',
//     buttonName: 'close'
//   },{size : 'sm'})
//   .confirm.subscribe(response => {
//     if(response){
//       this.documentArray.splice(i, 1)
//       this.sgs.showToaster('success', 'Document has been deleted.', 'Success', 2000, 'bottom-right');

//     }
//   })
// }


}
