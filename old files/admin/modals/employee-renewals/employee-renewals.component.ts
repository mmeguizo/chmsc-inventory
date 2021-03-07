import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'ngx-employee-renewals',
  templateUrl: './employee-renewals.component.html',
  styleUrls: ['./employee-renewals.component.scss']
})
export class EmployeeRenewalsComponent implements OnInit {
  public data = []
  id
  public filterQuery = '';
  public sortBy = 'id';
  public sortOrder = 'asc';
  public selectQueryString = 'Employee ID';
  public selectQuery = 'id';
  public now : any
  public today = new Date()
  constructor(
    public activeModal: NgbActiveModal,
    public sgs: SharedGlobalService
  ) { }

  ngOnInit(): void {
    this.getEmployeeById();

 

  }
  closeModal(){
    this.activeModal.close()
  }
  getEmployeeById(){
    this.now = `${this.today.getFullYear()}${('0' + (this.today.getMonth() + 1).toString()).slice(-2)}${('0' + this.today.getDate()).slice(-2)}`
      this.sgs.request('get', 'employee/getEmpById', {id : this.id}, async(res) => {
      if(res.success ){
          try {
        this.data = res.data[0].files
        this.data.map(e => {
          let dateExpire = new Date(e.dateExpire)
          e.expire =  `${dateExpire.getFullYear()}${('0' + (dateExpire.getMonth() + 1).toString()).slice(-2)}${('0' + dateExpire.getDate()).slice(-2)}`
          return e
          }) 
          } catch (error) {
            this.data = []
            alert('Employee Renewals is Empty!')
          }}
    })
  }
}
