import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { AddDeductionsComponent } from '../add-deductions/add-deductions.component';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'ngx-deductions',
  templateUrl: './deductions.component.html',
  styleUrls: ['./deductions.component.scss']
})
export class DeductionsComponent implements OnInit {
  public data = []
  public socketInstance;
  public total : Number
  constructor(
public sgs: SharedGlobalService,
    public activeModal  : NgbActiveModal
  ) {
    this.socketInstance = sgs.ResponseSocket('addDeduction').subscribe( emitted => {
      this.getAllDeductions();
    });
  }

  ngOnInit(): void {
    this.getAllDeductions()
  }

  closeModal(){
    this.activeModal.close()
  }

  getAllDeductions(){
    this.sgs.request('get', 'deduction/getAllDeductions', null , async(res) => {
        console.log(res.data);
        
      if(res.success){
        this.data = res.data
        this.total = this.data.map(e => e.deductiontotal).reduce((a, c) => { return a + c})

      }
      else {
        this.data = []
      }
    })
  }

  addDeduction(){
    this.sgs.Modal(
      {},
      {component : AddDeductionsComponent, size : 'sm'}
    )


  }
}
