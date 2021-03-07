import { Component, OnInit,  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReverseDate } from '../../../@core/pipes/dataFilter';
import { unReverseDate } from '../../../@core/pipes/dataFilter';

@Component({
  selector: 'ngx-update-time',
  templateUrl: './update-time.component.html',
  styleUrls: ['./update-time.component.scss']
})
export class UpdateTImeComponent implements OnInit {

  public timeLogs;
  public id;
  public uid;
  public form;
  public firstDate;
  public secondDate ;
  public objetId ;

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService,
    public rd: ReverseDate,
    public urd: unReverseDate
  ) {
    this.createForm();
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


    console.log(this.id);
    console.log(this.timeLogs);
    console.log(this.objetId);
    console.log(this.uid);
    console.log(this.firstDate);
    console.log(this.secondDate);

    this.sgs.request('get', 'attendance/getOneMonthUpdate', {selectedStartMonth: this.firstDate, selectedEndMonth: this.secondDate, uid: this.uid, id : this.id, objectId : this.objetId}, async (res) => {
      if(res.success){

        console.log('getOneMonthUpdate');
        console.log(res.data);


          res.data.map(e => {
            e.attendance.map(d => {

              this.form.controls['in'].patchValue(  this.rd.transform(d.in), {onlySelf : true} )
              this.form.controls['out'].patchValue( this.rd.transform(d.out), {onlySelf : true} )
              this.form.controls['lunchIn'].patchValue(this.rd.transform(d.lunchIn) , {onlySelf : true} )
              this.form.controls['lunchOut'].patchValue(this.rd.transform(d.lunchOut) , {onlySelf : true} )
              this.form.controls['breakIn'].patchValue(this.rd.transform(d.breakIn), {onlySelf : true} )
              this.form.controls['breakOut'].patchValue(this.rd.transform(d.breakOut), {onlySelf : true} )

            })
          })
      }
    });


    this.form = this.formBuilder.group({
      in:                    ['', [Validators.required]],
      out:                   ['', [Validators.required]],
      lunchIn:               ['', [Validators.required]],
      lunchOut:              ['', [Validators.required]],
      breakIn:               ['', [Validators.required]],
      breakOut:              ['', [Validators.required]],
    });

  }

  submit(){


    this.sgs.request('post', 'attendance/updateTime', {firstEmit : this.firstDate,secondEmit : this.secondDate,form: this.form.value, id: this.objetId, uid: this.uid, tid: this.timeLogs._id, mainId : this.id}, async (res) => {
      if(res.success){
        this.sgs.Toaster('success', 'Success', 'The selected time has been updated.');
        this.closeModal();
      }
    })

  }


  closeModal(){
    this.activeModal.close();
  }

}
