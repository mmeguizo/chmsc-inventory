import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import * as moment from 'moment';
import { UpdateEmployeeDocImageComponent } from '../update-employee-doc-image/update-employee-doc-image.component';
import { async } from 'rxjs/internal/scheduler/async';
import { UpdateEmployeeFieldComponent } from '../update-employee-field/update-employee-field.component';

@Component({
  selector: 'ngx-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
data
public form: any;
public id : any
public id2 : any
public id3 : any


public imgId : any
public edu  = []
public positions = []
public documents = []
public emergencyContact : any = []


public showEmergencyInfo : boolean = true;
public showEmploymentInfo : boolean = true;
public showEducationalInfo : boolean = true;
public showDocumentInfo : boolean= true;
  public imageInfo: any;
  public imageLoader = false;
  public elEventListenerActive: boolean;
  public socketInstance;



  public formChecker: boolean = true;
  public employment: any;
  public emergency: any;
  public educationalForm: any;
  public documentForm: any;

  public prefix : boolean
  public nickName : boolean
  public fname : boolean
  public lname : boolean
  public mname : boolean
  public gender : boolean
  public dateOfBirth : boolean
  public maritalStatus : boolean
  public streetAddress : boolean
  public barangay : boolean
  public city : boolean
  public province : boolean
  public zipCode : boolean
  public country : boolean
  public fullName : boolean
  public emergencyAddress : boolean
  public dateHired : boolean
  public position : boolean
  public employmentType : boolean
  public monthlySalary : boolean
  public hourlyRate : boolean
  public mobile : boolean
  public telephone : boolean
  public email	 : boolean
  public emergencyMobile	 : boolean
  public emergencyTelephone	 : boolean
  public emergencyRelationship	 : boolean




  public education : boolean
  public school : boolean
  public location : boolean
  public schoolYear : boolean
  public degree : boolean
  public requiredField: any=[];


  public idName : boolean
  public dateReleased : boolean
  public dateExpire : boolean

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService,
    public ngbModal: NgbModal,
  ) {
    this.socketInstance = sgs.ResponseSocket('addEmpReq').subscribe( emitted => {
      this.getRequiredFields();
    });

  }

  ngOnInit(): void {
    this.getRequiredFields()
    this.getEdu()
    this.getEmergency()
    this.createForm()
    this.getAllPosition()
  }

  createForm() {
    let dateOfBirth = moment(this.data.dateOfBirth).format("MM/DD/YYYY");
    let dateHired = moment(this.data.employmentDetails.dateHired).format("MM/DD/YY")
    this.form = this.formBuilder.group({
      uid: [''],
      prefix: [this.data.prefix, [Validators.required]],
      nickName: [this.data.nickName, [Validators.required]],
      fname: [this.data.fname, [Validators.required]],
      lname: [this.data.lname, [Validators.required]],
      mname: [this.data.mname, [Validators.required]],
      email: [this.data.email],
      mobile: [this.data.mobile],
      telephone: [this.data.telephone],
      gender: [this.data.gender, [Validators.required]],
      dateOfBirth: [dateOfBirth, [Validators.required]],
      maritalStatus: [this.data.maritalStatus, [Validators.required]],
      // imageURL: [''],
      streetAddress: [this.data.streetAddress, [Validators.required]],
      unitNumber: [this.data.unitNumber],
      barangay: [this.data.barangay, [Validators.required]],
      city: [this.data.city, [Validators.required]],
      province: [this.data.province, [Validators.required]],
      zipCode: [this.data.zipCode, [Validators.required]],
      country: [this.data.country],

    emergencyContact : this.formBuilder.group({
        id : [''],
        _id : [''],
        fullName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        mobile: [''],
        telephone: [''],
        relationship: [''],
      }),
      employmentDetails : this.formBuilder.group({
        dateHired: [dateHired, [Validators.required]],
        sss: [''],
        philHealth: [''],
        pagIbig: [''],
        tin: [''],
        position: [this.data.employmentDetails.position, [Validators.required]],
        employmentType: [this.data.employmentDetails.employmentType, [Validators.required]],
        monthlySalary: [this.data.employmentDetails.monthlySalary, [Validators.required]],
        hourlyRate: [this.data.employmentDetails.hourlyRate, [Validators.required]],
      }),
      educationDetails : this.formBuilder.group({
        id : [''],
        _id : [''],
        education: ['', [Validators.required]],
        school: ['', [Validators.required]],
        location: [''],
        schoolYear: ['', [Validators.required]],
        courseOfStudy: [''],
        degree: ['']
      }),
      documentDetails : this.formBuilder.group({
        id : [''],
        idName: ['', [Validators.required]],
        dateReleased: ['', [Validators.required]],
        dateExpire: ['', [Validators.required]],
      })

    })


  }


  getRequiredFields(){
    this.emergencyMobile = false;
    this.emergencyTelephone = false;
    this.emergencyRelationship = false;
    this.formChecker = false;
    this.employment = false;
    this.emergency = false;
    this.mobile = false;
    this.email = false;
    this.telephone = false;
    this.documentForm = false;
    this.educationalForm = false;
    this.prefix = false;
    this.nickName = false;
    this.fname= false;
    this.mname = false;
    this.lname = false;
    this.gender = false;
    this.dateOfBirth = false;
    this.maritalStatus = false;
    this.streetAddress = false;
    this.barangay = false;
    this.city = false;
    this.province = false;
    this.zipCode = false;
    this.country = false;
    this.fullName = false
    this.emergencyAddress = false
    this.dateHired = false;
    this.position = false;
    this.employmentType = false;
    this.monthlySalary = false;
    this.hourlyRate = false
    this.education  = false;
    this.school  = false;
    this.location  = false;
    this.schoolYear  = false;
    this.degree  = false
    this.dateReleased = false
    this.idName = false
    this.dateExpire = false
    this.sgs.request('get', 'empRequired_field/getRequiredFields', {}, async (res) => {


      if(res.success) {
        this.requiredField = res.data[0].fields;
        this.requiredField.map( field => {
          let fieldName = field.fieldName;
          console.log(fieldName);
            if(fieldName == 'prefix'){
              this.form.get('prefix').setValidators(Validators.required)
              this.prefix = true;
            }
            else if (fieldName == 'firstname'){
              this.fname= true;
            }
            else if (fieldName == 'middlename'){
              this.mname = true;
            }
            else if (fieldName == 'lastname'){
              this.lname = true;
            }
            else if (fieldName == 'nickname'){
              this.nickName = true;
            }
            else if (fieldName == 'gender'){
              this.gender = true;
            }
            else if (fieldName == 'dateofbirth'){
              this.dateOfBirth = true;
            }
            else if (fieldName =="maritalstatus"){
              this.maritalStatus = true;
            }
            else if (fieldName == 'address'){
              this.streetAddress = true;
            }
            else if (fieldName == 'barangay'){
              this.barangay = true;
            }
            else if (fieldName == 'city'){
              this.city = true;
            }
            else if (fieldName == 'province'){
              this.province = true;
            }
            else if (fieldName == 'country'){
              this.country = true;
            }
             else if (fieldName == 'zipcode'){
              this.zipCode = true;
            }
            else if (fieldName == 'mobile'){
              this.mobile = true;
            }
            else if (fieldName == 'telephone'){
              this.telephone = true;
            }
            else if (fieldName == 'email'){
              this.email = true;
            }
            else if (fieldName == 'emergencyFullname'){
              this.emergency = true;
              this.fullName = true;
            }
            else if (fieldName == 'emergencyAddress'){
              this.emergency = true;
              this.emergencyAddress = true;
            }
            else if (fieldName == 'emergencyMobile'){
              this.emergency = true;
              this.emergencyMobile = true;
            }
            else if (fieldName == 'emergencyTelephone'){
              this.emergency = true;
              this.emergencyTelephone = true;
            }
            else if (fieldName == 'emergencyRelationship'){
              this.emergency = true;
              this.emergencyRelationship = true;
            }
            else if (fieldName == 'datehired'){
              this.dateHired = true;
              this.employment = true;
            }
            else if (fieldName == 'position'){
              this.position = true;
              this.employment = true;
            }
            else if (fieldName == 'employmentType'){
              this.employmentType = true;
              this.employment = true;
            }
            else if (fieldName == 'monthlySalary'){
              this.employment = true;
              this.monthlySalary = true;
            }
            else if (fieldName == 'hourlyRate'){
              this.hourlyRate = true
              this.employment = true;
            }
            else if (fieldName == 'education'){
              this.educationalForm = true;
              this.education  = true;
            }
            else if (fieldName == 'schoolName'){
              this.educationalForm = true;
              this.school  = true;
            }
            else if (fieldName == 'schoolYear'){
              this.educationalForm = true;
              this.schoolYear  = true;
            }

            else if (fieldName == 'typeOfIds'){
              this.documentForm = true;
              this.idName = true
            }
            else if (fieldName == 'dateReleased'){
              this.documentForm = true;
              this.dateReleased = true
            }
            else if (fieldName == 'dateExpire'){
              this.documentForm = true;
              this.dateExpire = true
            }

        });
      }else{
        this.requiredField = [];
      }



    });

  }


  getEdu(){
    this.sgs.request('get','employee/getEdu', {_id : this.data._id}, async(res) => {
      if(res.success){
        this.edu = res.data[0].education
      }
      else {
        this.edu = []
      }

    })
  }
  getEmergency(){
    this.sgs.request('get', 'employee/getEmergency',{_id : this.data._id}, async(res) => {
      if(res.success){
        this.emergencyContact = res.data
      }
    })
  }
  editContact(contact , index){

    this.id3 = index
    this.form.patchValue({
      emergencyContact : {
        id : index,
        _id : contact._id,
        fullName : contact.fullName,
        address : contact.address,
        mobile : contact.mobile,
        telephone:  contact.telephone,
        relationship:  contact.relationship,

      }
    })

  }
  removeContact(id , index){
    this.sgs.Modal({
      header : `System Message`,
      content :  `Are you sure you want to delete this Contact ?`,
      type :'confirmation',
      buttonName: 'close'
    },{size : 'sm'})
    .confirm.subscribe(response => {
      if(response){
        this.sgs.request('put', 'employee/deleteContact', {_id : this.data._id,contactId : id }, async(res) => {
          this.emergencyContact = res.data
          this.sgs.showToaster('success', 'Document has been deleted.', 'Success', 2000, 'bottom-right');
        })

      }

    })
  }
  addEmergencyContact(contact){
    if(contact.id === ""){
      this.sgs.request('put', 'employee/pushContact',{_id : this.data._id, contact : contact}, async(res) => {

        if(res.success){
          this.emergencyContact = res.data
          this.sgs.showToaster('success', 'Contact has been added.', 'Success', 2000, 'bottom-right');
          this.form.patchValue({
            emergencyContact : {
              fullName:  '',
              address:  '',
              mobile: '',
              telephone: '',
              relationship: '',

            }
          })
        }



      })
    }
    else {
        this.sgs.request('put', 'employee/updateContact', {contact : contact, _id : this.data._id}, async(res) => {
          if(res.success){
            this.emergencyContact = res.data
        this.sgs.showToaster('success', 'Contact has been updated.', 'Success', 2000, 'bottom-right');
            this.form.patchValue({
              emergencyContact : {
                fullName:  '',
                address:  '',
                mobile: '',
                telephone: '',
                relationship: '',

              }
            })
          }

        })
    }





  }

  openFile(ev, id) {
    let file,
      el = document.getElementById(id);
    el.click();
    let handler = (fc) => {
      try {
        let fileList: any;
        let fd = new FormData();
        if (fc.target['files'][0]['name'] !== undefined) {
          fileList = fc.target;
          let file: File = fileList.files[0];
          fd.append('degree_attachment', file, file.name);
          this.sgs.submitting = true;
          this.sgs.request('post', 'xfile/empDocuments', fd, response => {
            if (response.success) {
              this.elEventListenerActive = false;
              this.imageInfo = {
                fileName: file.name,
                link: response.data.name,
                type: file.type
              }


              el.removeEventListener('change', handler);
            } else {
              el.removeEventListener('change', handler);
            }
          });
        } else {
          ev.target.innerHTML = 'Browse';
          this.elEventListenerActive = false;
          el.removeEventListener('change', handler);
        }
      } catch (e) {
        ev.target.innerHTML = 'Browse';
        this.elEventListenerActive = false;
        el.removeEventListener('change', handler);
      }
    }
    if (!this.elEventListenerActive) {
      el.addEventListener('change', handler);
      this.elEventListenerActive = true;
  }
}

addDocBackground() {
  this.documents.push(
    {
      fileName: this.imageInfo.fileName,
      link: this.imageInfo.link,
      type: this.imageInfo.type
    }
  );
  this.sgs.showToaster('success', 'Document has been added.', 'Success', 2000, 'bottom-right');
  this.imageInfo = undefined;
}
removeImage(data: string) {
  if (data) {
    this.sgs.request('post', 'xfile/deleteEmpDocument', { link: data }, async (response) => {
    });
    this.sgs.showToaster('success', 'Image has been removed.','Success', 2000, 'bottom-right');
    this.imageInfo = undefined;
  }
}

  removeEduc(id, index){
    this.sgs.Modal({
      header : `System Message`,
      content :  `Are you sure you want to delete education background ?`,
      type :'confirmation',
      buttonName: 'close'
    },{size : 'sm'})
    .confirm.subscribe(response => {
      if(response){
        this.sgs.request('put','employee/deleteEduBackground', {_id : this.data._id, eduId : id}, async(res) => {
         if(res.success){
           this.edu = res.data[0].education
          this.sgs.showToaster('success', 'Education background has been deleted.', 'Success', 2000, 'bottom-right');

         }
         else {
           this.edu = []
         }

        })
        // this.edu.splice(i, 1)

      }

    })
  }
  emergencyIcon = 'fas fa-minus';
  employmentIcon = 'fas fa-minus';
  educationalIcon = 'fas fa-minus';
  documentIcon = 'fas fa-minus';

  viewEmergency() {
    if (this.showEmergencyInfo == true) {
      this.showEmergencyInfo = false;
      this.emergencyIcon = 'fas fa-plus'

    } else {
      this.showEmergencyInfo = true;
      this.emergencyIcon = 'fas fa-minus';

    }

  }

  viewEmployment() {
    if (this.showEmploymentInfo == true) {
      this.showEmploymentInfo = false;
      this.employmentIcon = 'fas fa-plus'

    } else {
      this.showEmploymentInfo = true;
      this.employmentIcon = 'fas fa-minus';

    }

  }

  save(documents){
   if(documents.id == ""){
     this.sgs.request('put', 'employee/pushDoc',
     {_id : this.data._id,
      documents : this.documents,
      file : documents},
      async(res) => {

        if(res.success){
          this.data.files = res.data[0].files
          this.documents = []
          this.form.patchValue({
            documentDetails : {
              id : '',
              idName : '',
              dateReleased : '',
              dateExpire : '',
            }

          })
        }

     } )
   }
   else {
      this.sgs.request('put', 'employee/updateDoc',{
        _id : this.data._id,
      documents : this.documents,
      file : documents,
      }, async(res) => {

        if(res.success){
          this.data.files = res.data[0].files
          this.documents = []

          this.form.patchValue({
            documentDetails : {
              id : '',
              idName : '',
              dateReleased : '',
              dateExpire : '',
            }

          })
        }

      })
   }


  }
  viewEducationalBackground() {
    if (this.showEducationalInfo == true) {
      this.showEducationalInfo = false;
      this.educationalIcon = 'fas fa-plus'
    } else {
      this.showEducationalInfo = true;
      this.educationalIcon = 'fas fa-minus';
    }
  }

  viewDocuments() {
    if (this.showDocumentInfo == true) {
      this.showDocumentInfo = false;
      this.documentIcon = 'fas fa-plus';
    } else {
      this.showDocumentInfo = true;
      this.documentIcon = 'fas fa-minus';
    }
  }

  getAllPosition() {
    this.sgs.request('get', 'position/getAllPosition', {}, response => {
      if(response.success) {
        this.positions = response.data;
      }
    });
  }

  closeModal(){
    this.activeModal.close()
  }
  updateEmployee(){
    this.sgs.request('put', 'employee/empUpdate', {_id : this.data._id, form : this.form.value},async(res) => {
      if(res.success){
        this.sgs.showToaster('success', 'Employee updated successfully.', 'Success', 2000, 'bottom-right');
        this.closeModal()
      }
      else {
        this.sgs.showToaster('success', 'Employee updated successfully.', 'Success', 2000, 'bottom-right');
        this.closeModal()
      }

    })

  }

  editEduc(educational , i){
    this.id = i
    this.form.patchValue({
      educationDetails : {
        id : i,
        _id : educational._id,
      courseOfStudy : educational.courseOfStudy,
      degree : educational.degree,
      education : educational.education,
      location : educational.location,
      school: educational.school,
      schoolYear : educational.schoolYear,
      }
    })
  }

  editDoc(files , i){

    let expire = moment(files.dateExpire).format("MM/DD/YYYY");
    let released = moment(files.dateReleased).format("MM/DD/YYYY");

    this.id2 = files.fileId
    this.form.patchValue({
      documentDetails : {
        id : files.fileId,
        idName : files.idName,
        dateReleased : released,
        dateExpire  : expire
      }
    })
  }

  view(image, fileId){
    this.sgs.Modal(
      {image : image, id : this.data._id, fileId : fileId },
    {component : UpdateEmployeeDocImageComponent, size : 'lg'}
    )

  }



  addEducationalBackground(education){
    if(education.id === ""){
      this.sgs.request('put', 'employee/pushEdu', {_id : this.data._id, education : education}, async(res) => {
        if(res.success){
          this.edu = res.data[0].education
          this.sgs.showToaster('success', 'Education background has been added.', 'Success', 2000, 'bottom-right');
        }
        else {
        this.edu = []

        }
      })
    }
     else {
      this.sgs.request('put', 'employee/updateEdu', {_id : this.data._id, education : education}, async(res) => {
        if(res.success){
          this.edu = res.data[0].education
          this.sgs.showToaster('success', 'Education background has been updated.', 'Success', 2000, 'bottom-right');
        }
      })

    }
    this.form.patchValue({
      educationDetails : {
      _id : '',
      id : '',
      courseOfStudy : '',
      degree : '',
      education : '',
      location : '',
      school: '',
      schoolYear : ''
      }
    })
  }


  removeId(i, index){
    this.sgs.Modal({
      header : `System Message`,
      content :  `Are you sure you want to delete education background ?`,
      type :'confirmation',
      buttonName: 'close'
    },{size : 'sm'})
    .confirm.subscribe(response => {
      if(response){
        this.sgs.request('put', 'employee/deleteFiles', {_id : this.data._id,filesId : i }, async(res) => {
          this.data.files.splice(index, 1)
          this.sgs.showToaster('success', 'Document has been deleted.', 'Success', 2000, 'bottom-right');
        })

      }

    })
  }

  updateEmpField(){
    this.sgs.Modal(
      {},
      {component : UpdateEmployeeFieldComponent, size : 'md'}
    )
  }
}
