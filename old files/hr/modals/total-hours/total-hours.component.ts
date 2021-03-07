import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { async } from 'rxjs/internal/scheduler/async';
@Component({
  selector: 'ngx-total-hours',
  templateUrl: './total-hours.component.html',
  styleUrls: ['./total-hours.component.scss']
})
export class TotalHoursComponent implements OnInit {
  //Employee id From payslip
  eid
  //Employee total hours of work
  totalHours
  constructor(
    public sgs : SharedGlobalService,
    public activeModal : NgbActiveModal
  ) { }

  ngOnInit(): void {



  }
  closeModal(){
    this.activeModal.close()
  }

  save(){
    this.sgs.request('put', 'employee/addTotalHours',
    {id : this.eid,
    totalHours : this.totalHours},
    async(res) => {
      if(res.success){
        console.log(res.data);

        this.closeModal()
        this.sgs.showToaster('success', 'Total hours has been updated.', 'Success', 2000, 'bottom-right');

      }

    })
  }

}
