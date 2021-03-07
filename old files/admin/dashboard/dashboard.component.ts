import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { async } from '@angular/core/testing';
import { EmployeeRenewalsComponent } from '../modals/employee-renewals/employee-renewals.component';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public data = [];
  public newData = [];
  public EmployeeData = [];
  count = 200;
  public loading = true;
  public filterQuery = '';
  public sortBy = 'id';
  public sortOrder = 'asc';
  public selectQueryString = 'Employee ID';
  public selectQuery = 'id';
  public today = new Date();
  public now: any;

  date;
  hours: string;
  minutes: string;
  seconds: string;
  PmAmTime: string;
  public timerId = null;
  attendance: any;
  employees: any;
  onDuty = 0;
  leaves = 0;
  loans = 0;
  PmAm = 0;
  //loaders
  aLoader = true;

  //socket instances
  attendanceInstance: any;
  socketInstance: any;
  socketInstance1: any;
  months: any;
  events = [];
  selectedMonth: string;
  currentDate = new Date().getFullYear();

  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild('search', { static: false }) nameField: ElementRef;

  constructor(public sgs: SharedGlobalService, public ngbModal: NgbModal) {
    this.socketInstance = sgs.ResponseSocket('newVehicle').subscribe((emitted) => {
      this.getAllVehicles();
    });
  }

  ngOnInit() {
    this.getAllVehicles();
    this.partsRequest();
    this.date = new Date();
    this.setCurrentTime();
    this.timerId = this.updateTime();
    this.getTodayAttendance();
    this.getAllUsers();
    // this.getAllEmployees()
  }

  getAllUsers() {
    this.sgs.request(
      'get',
      'user/getAllUsers',
      null,
      async (res) => {
        if (res.success) {
          this.employees = res.data.length;
        } else {
          console.log(res);
        }
      },
      { cache: true, describe: 'Error getting users!' }
    );
  }

  private setCurrentTime() {
    const time = new Date(Date.now());
    this.hours = this.leftPadZero((time.getHours() + 24) % 12 || 12);
    this.PmAmTime = this.leftPadZero(time.getHours());
    this.minutes = this.leftPadZero(time.getMinutes());
    this.seconds = this.leftPadZero(time.getSeconds());
    this.PmAm = parseInt(this.PmAmTime);
  }

  private updateTime() {
    setInterval(() => {
      this.setCurrentTime();
    }, 1000);
  }

  private leftPadZero(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }

  getTodayAttendance() {
    this.sgs.request('get', 'attendance/getTodayAttendance', { date: this.date }, async (res) => {
      if (res.success) {
        this.aLoader = false;
        this.attendance = res.data;
        this.onDuty = res.data.length;
      } else {
        this.attendance = [];
        this.aLoader = false;
      }
    });
  }

  getAllVehicles() {
    this.now = `${this.today.getFullYear()}${('0' + (this.today.getMonth() + 1).toString()).slice(-2)}${('0' + this.today.getDate()).slice(-2)}`;
    this.sgs.request('get', 'truck/getAllVehicles', null, async (res) => {
      if (res.success) {
        this.loading = false;
        this.data = res.data;
        this.data.map((expire) => {
          let renewal = new Date(expire.renewal);
          let nextChange = new Date(expire.nextChangeOil);
          let nextGear = new Date(expire.nextGearOil);

          expire.ex = `${renewal.getFullYear()}${('0' + (renewal.getMonth() + 1).toString()).slice(-2)}${('0' + renewal.getDate()).slice(-2)}`;
          expire.next = `${nextChange.getFullYear()}${('0' + (nextChange.getMonth() + 1).toString()).slice(-2)}${('0' + nextChange.getDate()).slice(-2)}`;
          expire.gear = `${nextGear.getFullYear()}${('0' + (nextGear.getMonth() + 1).toString()).slice(-2)}${('0' + nextGear.getDate()).slice(-2)}`;

        });
      } else {
        this.loading = false;
        this.data = [];
      }
    });
  }

  viewTruck() { }

  partsRequest() {
    this.sgs.request('get', 'request/getAllPartsRequest', null, async (res) => {
      if (res.success) {
        this.loading = false;
        this.newData = res.data;
      } else {
        this.loading = false;
        this.newData = [];
      }
    });
  }

  goToEmployees() {
    this.sgs.goto('/admin/time-tracking');
  }

  ngOnDestroy(): void {
    // this.socketInstance1.unsubscribe();
    // this.socketInstance2.unsubscribe();
    this.socketInstance.unsubscribe();
  }
}
