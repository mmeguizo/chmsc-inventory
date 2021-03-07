import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { EmployeeRenewalsComponent } from '../../modals/employee-renewals/employee-renewals.component';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';

@Component({
  selector: 'ngx-renewals',
  templateUrl: './renewals.component.html',
  styleUrls: ['./renewals.component.scss']
})
export class RenewalsComponent implements OnInit {
  @Input() data :any[];
  public filterQuery = '';
  public sortBy = 'id';
  public sortOrder = 'asc';
  public selectQueryString = 'Employee ID';
  public selectQuery = 'id';


  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild("search", {static: false}) nameField: ElementRef;
  constructor(
      public sgs :SharedGlobalService
  ) { }

  ngOnInit(): void {



  }

 selectFilter(name, value){
    this.selectQuery = name;
    this.selectQueryString = value;
    this.popover.hide();
    setTimeout(() => this.nameField.nativeElement.focus(), 0);
    this.filterQuery = "";
  }

  renewals(id){
    this.sgs.Modal(
      {id},
      {component : EmployeeRenewalsComponent, size : 'lg'}
    )

  }
}
