import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../@core/services/shared.global.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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
  loading: boolean;
  events = [];
  selectedMonth: string;
  currentDate = new Date().getFullYear()

  constructor(
    public sgs: SharedGlobalService
  ){

    this.attendanceInstance = sgs.ResponseSocket('attendance').subscribe( emitted => {
        this.getTodayAttendance();
    });

  }

  ngOnInit() {
    this.date = new Date();
    this.setCurrentTime();
    this.timerId = this.updateTime();
    this.getTodayAttendance();
    this.getAllUsers();


  }


  ngOnDestroy(){
    clearInterval(this.timerId);
    this.attendanceInstance.unsubscribe();
  }

  private setCurrentTime() {
    const time = new Date();
    this.hours = this.leftPadZero( (time.getHours() + 24 ) % 12 || 12);
    this.PmAmTime = this.leftPadZero( time.getHours());
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

  getTodayAttendance(){
    this.sgs.request('get', 'attendance/getTodayAttendance', {date: this.date}, async (res) => {
      console.log(res.data);
      if(res.success){
        this.aLoader = false;
        this.attendance = res.data;
        this.onDuty = res.data.length

      }else{
        this.attendance = [];
        this.aLoader = false;

      }
    })
  }


  getAllUsers(){
    this.sgs.request('get', 'user/getAllUsers', null, async (res) => {
      if( res.success ){
       this.employees = res.data.length;

      }else{
        console.log( res );
      }
    },{cache:true, describe: "Error getting users!" });
  }


  // getAllEmployee(){
  //   this.sgs.request('get', 'user/getAllUsers', null, async (res) => {
  //     if( res.success ){
  //      this.employees = res.data;
  //      this.loading = false;
  //      console.log(this.employees);
  //     }else{
  //       console.log( res );
  //     }
  //   },{cache:true, describe: "Error getting users!" });
  // }



  goToEmployees(){
  console.log('gotoi');
  this.sgs.goto('/hr/time-tracking')

 }


}
