import { Component, OnInit,  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReverseDate } from '../../../@core/pipes/dataFilter';

@Component({
  selector: 'ngx-add-attendance-to-employee',
  templateUrl: './add-attendance-to-employee.component.html',
  styleUrls: ['./add-attendance-to-employee.component.scss']
})
export class AddAttendanceToEmployeeComponent implements OnInit {

  public id;
  public form;
  public uid;
  public date;
  public selectedDate;



  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService,
    public rd: ReverseDate
  ) {

  }


  createForm(){
    this.form = this.formBuilder.group({
      in:                    ['', [Validators.required]],
      out:                   ['', [Validators.required]],
      lunchIn:               ['', [Validators.required]],
      lunchOut:              ['', [Validators.required]],
      breakIn:               ['', [Validators.required]],
      breakOut:              ['', [Validators.required]],
    });
   }

  ngOnInit() {

    console.log(this.date);
    let start, end;


    //get login in time in and out
    this.sgs.request('get', 'day/getDays', { id : this.id}, async (res) => {
      res.data.map( e => {
       // this.form.controls['in'].patchValue( this.rd.transform(e.starts) , {onlySelf : true} )
     //   this.form.controls['out'].patchValue( this.rd.transform(e.ends) , {onlySelf : true} )
        //  this.form.controls['in'].patchValue( e.starts , {onlySelf : true} )
        //  this.form.controls['out'].patchValue( e.ends , {onlySelf : true} )
    });
    })


    this.form = this.formBuilder.group({
      in:                    ['', [Validators.required]],
      out:                   ['', [Validators.required]],
      lunchIn:               ['', [Validators.required]],
      lunchOut:              ['', [Validators.required]],
      breakIn:               ['', [Validators.required]],
      breakOut:              ['', [Validators.required]],
      // in:               [new Date(this.selectedDate.setHours(9,0,0)), [Validators.required]],
      // out:              [new Date(this.selectedDate.setHours(18,0,0)), [Validators.required]],
    });

    this.createForm();

  }

  ngOnDestroy(): void {
  }




  submit(){

    this.sgs.request('get', 'attendance/checkIfDateExist', {date: this.date}, async (res) => {
      if(res.success){
        // check if id exist
        this.sgs.request('get', 'attendance/checkIfIdExist', { uid: this.uid, tid: res.data[0]._id}, async (idExistRes) => {
          if(idExistRes.success){
            this.sgs.request('put', 'attendance/addManualTime', {form: this.form.value, uid: this.uid, tid: res.data[0]._id}, async (updRes) => {
              if(updRes.success){
                this.sgs.Toaster('success', 'Success', 'You manually added an attendance.');
                this.closeModal()
              }
            })
          }else{
            this.sgs.request('put', 'attendance/addManualTimeWithID', {form: this.form.value, uid: this.uid, tid: res.data[0]._id}, async (updRes) => {
              if(updRes.success){
                this.sgs.Toaster('success', 'Success', 'You manually added an attendance.');
                this.closeModal()
              }
            })
          }
        })
      }else{
        //for the meantime remove holiday
        this.sgs.request('post', 'attendance/createNewAttendance', {date: this.date, eventID: 'null anay ah', form: this.form.value, uid: this.uid }, async (resData) => {
          if(resData.success){
            this.sgs.Toaster('success', 'Success', 'You manually added an attendance.');
            this.closeModal()
          }else{
            this.sgs.Toaster('danger', 'Warning', "Error adding attendance, please try again.");
          }
        });

      }
    })
  }

  closeModal(){
    this.activeModal.close();
  }

}
