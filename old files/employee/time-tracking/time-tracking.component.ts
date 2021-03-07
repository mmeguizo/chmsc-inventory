import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { ReverseDate } from '../../@core/pipes/dataFilter';
import { AuthService } from '../../@core/services/auth.service';

// import { AddAttendanceToEmployeeComponent } from '../modals/add-attendance-to-employee/add-attendance-to-employee.component';

@Component({
	selector: 'ngx-time-tracking',
	templateUrl: './time-tracking.component.html',
	styleUrls: ['./time-tracking.component.scss'],
})
export class TimeTrackingComponent implements OnInit {
	toDate = new Date();
	maxDate = new Date();
	filterQuery = '';
	sortBy = 'uid';
	sortOrder = 'asc';
	selectQueryString = 'Last Name';
	selectQuery = 'lname';
	data = [];
	loading = true;
	private socketInstance;
	noData;
	avatar: any;
	// employees;
	public minSetHourDay;
	public maxSetHourDay;
	public gracePeriodDay;
	public graceTimeDay;

	constructor(public sgs: SharedGlobalService, public ngbModal: NgbModal, public dp: DatePipe, public rd: ReverseDate, public auth: AuthService) {
		this.maxDate.setDate(this.maxDate.getDate());
		this.socketInstance = sgs.ResponseSocket('attendance').subscribe((emitted) => {
			this.getTodayAttendance();
		});
	}

	ngOnInit() {
		console.log('!!!!!');
		console.log(this.toDate);
		// this.getDays();
		this.getTodayAttendance();
	}

	ngOnDestroy() {
		this.socketInstance.unsubscribe();
	}

	handler(value: string): void {
		this.data = [];
		this.getTodayAttendance();
	}

	testArray = [];

	// getDays(){
	//   this.sgs.request('get', 'day/getDays', {}, async (res) => {

	//     if(res.success){
	//       res.data.map(e => {
	//         this.minSetHourDay= e.starts;
	//         this.maxSetHourDay= e.ends;
	//         this.gracePeriodDay =  e.gracePeriods;

	//       });
	//     }
	//   })
	// }

	getTodayAttendance() {
		this.data = [];
		this.loading = true;

		this.sgs.request('get', 'day/getDays', {}, async (res) => {
			if (res.success) {
				res.data.map((e) => {
					this.minSetHourDay = this.rd.transform(e.starts);
					this.maxSetHourDay = this.rd.transform(e.ends);
					this.gracePeriodDay = this.rd.transform(e.gracePeriods);
					this.graceTimeDay = this.rd.transform(e.graceTime);
					// this.minSetHourDay= e.starts;
					// this.maxSetHourDay= e.ends;
					// this.gracePeriodDay =  e.gracePeriods;
					// this.graceTimeDay =  e.graceTime;
				});

				this.sgs.request('get', 'attendance/getTodayAttendanceById', { date: this.toDate, id: this.auth.getTokenData('id') }, async (res) => {
					console.log('getTodayAttendanceById');
					console.log(res.data);

					let lateIn = 0;
					let lateOut = 0;

					if (res.success) {
						this.noData = '';
						res.data.map((x, i) => {
							this.testArray.push(res.data[i].uid);

							res.data[i].totalHours = 0;
							res.data[i].totalMinutes = 0;
							res.data[i].total = 0;
							res.data[i].late = 0;
							res.data[i].out = x.attendance[x.attendance.length - 1].out; //get the last attendance

							x.attendance.map((y, j) => {
								var dt1 = new Date(this.rd.transform(y.in));
								var lunchTimeIn = new Date(this.rd.transform(y.lunchIn));
								var breakTimeIn = new Date(this.rd.transform(y.breakIn));

								if (y.out == '' || y.out == null) {
									var dt2 = new Date();
								} else {
									var dt2 = new Date(this.rd.transform(y.out));
								}

								if (y.lunchOut == '' || y.lunchOut == null) {
									var lunchTimeOut = new Date();
								} else {
									var lunchTimeOut = new Date(this.rd.transform(y.lunchOut));
								}

								if (y.breakOut == '' || y.breakOut == null) {
									var breakTimeOut = new Date();
								} else {
									var breakTimeOut = new Date(this.rd.transform(y.breakOut));
								}

								// minSetHour = 9:00 AM - regular working start hour
								// var minSetHour =  new Date(dt1).setHours(8,0,0);
								var minSetHour = new Date(dt1).setHours(new Date(this.minSetHourDay).getHours(), new Date(this.minSetHourDay).getMinutes(), 0);
								// var minSetHour = new Date(dt1).setHours(9,0,0);

								// maxSetHour = 18:00 PM - regular working end hour
								// var maxSetHour =  new Date(dt1).setHours(17,0,0);
								var maxSetHour = new Date(dt2).setHours(new Date(this.maxSetHourDay).getHours(), new Date(this.maxSetHourDay).getMinutes(), 0);
								// var maxSetHour = new Date(dt2).setHours(18,0,0);

								// grace period of 15 mins, after 15 mins, absent equavalent of 1 hours will be deducted to time rendered or 9-10 equevalent of time
								// var gracePeriod =  new Date(dt1).setHours(9,0,0);
								var gracePeriod = new Date(dt1).setHours(new Date(this.gracePeriodDay).getHours(), new Date(this.gracePeriodDay).getMinutes(), 0);
								// var gracePeriod = new Date(dt1).setHours(9,15,0);

								// time after grace period
								// var graceTime =  new Date(dt1).setHours(10,0,0);
								var graceTime = new Date(dt1).setHours(new Date(this.graceTimeDay).getHours(), new Date(this.graceTimeDay).getMinutes(), 0);
								// var graceTime = new Date(dt1).setHours(10,0,0);

								// start of noon break
								// var noonBreakStart = new Date(dt1).setHours(12,0,0);
								// var noonBreakStart =  new Date(lunchTimeIn).setHours(new Date(lunchTimeIn).getHours(),new Date(lunchTimeIn).getMinutes(),0);
								var noonBreakStart = new Date(lunchTimeIn);
								var BreakStart = new Date(breakTimeIn);

								// end of noon break
								// var noonBreakEnd = new Date(dt1).setHours(13,0,0);
								// var noonBreakEnd =  new Date(lunchTimeOut).setHours(new Date(lunchTimeOut).getHours(),new Date(lunchTimeOut).getMinutes(),0);
								var noonBreakEnd = new Date(lunchTimeOut);
								var BreakEnd = new Date(breakTimeOut);

								// check noon break
								// var lunchBreak = 0;
								var lunchBreak = (noonBreakEnd.valueOf() - noonBreakStart.valueOf()) / 1000;
								var lunchTotal = (noonBreakEnd.valueOf() - noonBreakStart.valueOf()) / 1000;

								lunchBreak /= 60;
								lunchBreak = Math.abs(Math.round(lunchBreak));
								//check starting/in attendance

								//check breaks
								var Break = (BreakEnd.valueOf() - BreakStart.valueOf()) / 1000;
								var BreakhTotal = (BreakEnd.valueOf() - BreakStart.valueOf()) / 1000;

								BreakhTotal /= 60;
								BreakhTotal = Math.abs(Math.round(BreakhTotal));

								Break /= 60;
								Break = Math.abs(Math.round(Break));

								if (dt1.getTime() < minSetHour) {
									dt1 = new Date(minSetHour);
								} else {
									// check grace period and time-in (9:15)
									if (dt1.getTime() <= gracePeriod) {
										dt1 = new Date(minSetHour);
									} else {
										//grace period applies only in the morning, get index 0 only and apply min grace time
										if (j == 0) {
											// if time-in exceed the grace period, and time is less than or equal 9:16-9:59AM, 10AM will be applied to time-in, else time in will apply
											// console.log(dt1.getTime() >= new Date(dt1).setHours(9,16,0), dt1.getTime() <= new Date(dt1).setHours(9,59,0))
											if (dt1.getTime() >= gracePeriod && dt1.getTime() <= graceTime) {
												// if(dt1.getTime() >= new Date(dt1).setHours(9,16,0) && dt1.getTime() <= new Date(dt1).setHours(9,59,0)){
												dt1 = new Date(graceTime);
											} else {
												dt1 = dt1;
											}
											// dt1 = new Date(graceTime);
											// console.log(new Date(graceTime))
										}
									}
								}

								if (dt2.getTime() > maxSetHour) {
									//moement calculation of Overtime
									var starts = moment(new Date(maxSetHour));
									var ends = moment(new Date(dt2));
									var duration = moment.duration(starts.diff(ends));
									var minutes = duration.asMinutes();
									var otTotal = Math.abs(Math.round(minutes));
									//end of moment overtime calculation

									dt2 = new Date(maxSetHour);
								}

								// if login is more than 9.16 and less than 10am
								if (dt1.getTime() > gracePeriod && dt1.getTime() <= graceTime) {
									dt1 = new Date(graceTime); // 10am set and wil be counted as an hour late
									lateIn += Math.abs(Math.round((minSetHour - dt1.getTime()) / 1000));
									lateIn /= 60 * 60;
								}

								// if login is more than 10 am
								if (dt1.getTime() > graceTime) {
									lateIn += Math.abs(Math.round((minSetHour - dt1.getTime()) / 1000));
									lateIn /= 60 * 60;
								}

								lunchTotal /= 60;
								lunchTotal = Math.abs(Math.round(lunchTotal));

								var diff = (dt2.getTime() - dt1.getTime()) / 1000;

								//if lunch break is less than an hour considered 1 hour otherwise for reporting only
								if (lunchBreak < 60) {
									lunchBreak = 60;
								}

								// diff /= 60;
								diff = diff / 60 - lunchBreak;
								var Totalminutes = Math.abs(Math.round(diff));

								var hours = Totalminutes / 60;
								var rhours = Math.floor(hours);
								var minutes = (hours - rhours) * 60;
								var rminutes = Math.round(minutes);

								// res.data[i].total = rhours + " hour(s) and " + rminutes + " minute(s).";
								res.data[i].totalHours += rhours; // total hours
								res.data[i].totalMinutes += rminutes; // total Minutes
								res.data[i].total += Totalminutes; // total converted minutes from date
								res.data[i].late = lateIn; // total converted minutes from date
								res.data[i].status = '1';
								res.data[i].lunchTotal = lunchTotal;
								res.data[i].break = BreakhTotal;
								res.data[i].overtime = otTotal;
							});

							this.data.push(res.data[i]);

							lateIn = 0;
						});

						this.getAllPayrolledUsers(this.testArray);
						this.loading = false;
					} else {
						this.getAllPayrolledUsers([0]);
						this.loading = false;
					}
				});

				console.log(res.data);
			}
		});
		console.log(this.data);
	}

	getAllPayrolledUsers(data) {
		this.sgs.request('get', 'user/getAllPayrolledUsersById', { data: data, id: this.auth.getTokenData('id') }, (res) => {
			if (res.success) {
				this.noData = '';
				this.loading = false;
				//add payroll data tothe table
				this.data.length !== 0 || res.data.map((a) => this.data.push(a));
			} else {
				if (this.data.length === 0) {
					this.data = [];
				} else {
					//  this.data = res.data.map(a => this.data.push(a))
					//this.data = []
				}
				this.loading = false;
			}
		});
	}

	showTimeLogs(name, uid, timeLogs) {
		console.log(name);
		console.log(uid);
		console.log(timeLogs);

		let tr = [];
		let th = [
			`
      <tr>
        <th class='acenter'>#</th>
        <th class='acenter'>Time In</th>
        <th class='acenter'>Time Out</th>
        <th class='acenter'>Lunch In</th>
        <th class='acenter'>Lunch Out</th>
        <th class='acenter'>Break In</th>
        <th class='acenter'>Break Out</th>
      </tr>
    `,
		];

		timeLogs.map((el, i) => {
			let timeIn = '';
			let timeOut = '';
			let breakIn = '';
			let breakOut = '';
			let lunchIn = '';
			let lunchOut = '';

			if (el.lunchIn == '' || el.lunchIn == null) {
				lunchIn = "<td style='text-align: center'>-</td>";
			} else {
				lunchIn = '<td>' + moment(this.rd.transform(el.lunchIn)).format('hh:mm:ss A') + '</td>';
			}

			if (el.lunchOut == '' || el.lunchOut == null) {
				lunchOut = "<td class='acenter'>-</td>";
			} else {
				lunchOut = '<td>' + moment(this.rd.transform(el.lunchOut)).format('hh:mm:ss A') + '</td>';
			}

			if (el.breakIn == '' || el.breakIn == null) {
				breakIn = "<td style='text-align: center'>-</td>";
			} else {
				breakIn = '<td>' + moment(this.rd.transform(el.breakIn)).format('hh:mm:ss A') + '</td>';
			}

			if (el.breakOut == '' || el.breakOut == null) {
				breakOut = "<td class='acenter'>-</td>";
			} else {
				breakOut = '<td>' + moment(this.rd.transform(el.breakOut)).format('hh:mm:ss A') + '</td>';
			}

			if (el.in == '' || el.in == null) {
				timeIn = "<td style='text-align: center'>-</td>";
			} else {
				timeIn = '<td>' + moment(this.rd.transform(el.in)).format('hh:mm:ss A') + '</td>';
			}

			if (el.out == '' || el.out == null) {
				timeOut = "<td class='acenter'>-</td>";
			} else {
				timeOut = '<td>' + moment(this.rd.transform(el.out)).format('hh:mm:ss A') + '</td>';
			}

			tr.push(`
        <tr>
          <td>${i + 1}</td>
          ${timeIn}
          ${timeOut}
          ${lunchIn}
          ${lunchOut}
          ${breakIn}
          ${breakOut}
        </tr>
      `);
		});

		this.sgs.Modal(
			{
				header: `Time Logs`,
				content: `
        <p>
          ${uid} - ${name}
        </p>
        <table class="table table-bordered">
          <thead>
            ${th}
          </thead>
          <tbody>
            ${tr.join('')}
          </tbody>
        </table>
      `,
				buttonName: 'close',
			},
			{ size: 'lg' }
		);
	}

	selectFilter(name, value) {
		this.selectQuery = name;
		this.selectQueryString = value;
	}

	timeProof(data, id) {
		//get the avatar
		this.sgs.request('get', 'user/getUserById', { id: id }, async (response) => {
			console.log(response.data);

			if (response.success) {
				//add picture to the data
				this.avatar = response.data.avatar;
				var images = [];
				for (var x = 0; x < data.length; x++) {
					images.push(`
              <tr>
                <td>
                  <img width="100px" height="100px" id='image-source' src="${this.sgs.connection}/avatars/${this.avatar}">
                </td>
                <td>
                  <img width="100px" height="100px" id='image-source'  src="${this.sgs.connection}/avatars/${this.avatar}">
                </td>
              </tr>
              <tr class='acenter'>
                <td>
                  In - ${this.dp.transform(this.rd.transform(data[x].in), 'mediumTime')}
                </td>
                <td>
                  Out - ${this.dp.transform(this.rd.transform(data[x].out), 'mediumTime')}
                </td>
              </tr>
          `);
				}
				this.sgs.Modal(
					{
						header: `Time Proof Gallery`,
						content: `<table>${images.join('')}</table>`,
						buttonName: 'close',
					},
					{ size: 'sm' }
				);
			}
		});
	}

	// addAttendanceToEmployee(uid) {
	// 	const activeModal = this.ngbModal.open(AddAttendanceToEmployeeComponent, { size: 'md', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
	// 	activeModal.componentInstance.uid = uid;
	// 	activeModal.componentInstance.date = this.toDate;
	// 	activeModal.componentInstance.selectedDate = this.toDate;
	// }

	timeSheet(id) {
		// this.sgs.setGlobal(id);
		this.sgs.gothere('employee/timeSheet', id);
	}
}
