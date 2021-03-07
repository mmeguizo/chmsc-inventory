import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from 'lodash';
import { FormBuilder, Validators } from '@angular/forms';
import { TimeLogsComponent } from '../modals/time-logs/time-logs.component';
import { ReverseDate } from '../../@core/pipes/dataFilter';

@Component({
	selector: 'ngx-time-sheet',
	templateUrl: './time-sheet.component.html',
	styleUrls: ['./time-sheet.component.scss'],
})
export class TimeSheetComponent implements OnInit {
	isPaySlip;
	form; //form builder form

	toDate = new Date();
	filterQuery = '';
	sortBy = 'actualDate';
	sortOrder = 'desc';
	selectQueryString = 'Last Name';
	selectQuery = 'lname';
	data = [];
	loading = true;
	noData;

	profile;
	employment;

	//test
	selectedDate;
	selecta;
	numberofDays;
	name;
	curEmployment;
	FinalTotalLate = 0;
	public minSetHourDay;
	public maxSetHourDay;
	public gracePeriodDay;
	public graceTimeDay;

	dateRange;
	firstDate;
	secondDate;
	private socketInstance;
	public socketDeleteInstance;
	adminId: any;
	FinalTotalOT = 0;

	constructor(public sgs: SharedGlobalService, public ngbModal: NgbModal, public route: ActivatedRoute, public formBuilder: FormBuilder, public rd: ReverseDate) {
		this.createForm();

		this.selecta = new Date();

		var starting = new Date(this.selecta.setDate(1)).toISOString();
		var ending = new Date(this.selecta.setDate(31)).toISOString();

		this.socketInstance = sgs.ResponseSocket('updateTime').subscribe((emitted) => {
			console.log(emitted);

			if (this.dateRange) {
				this.FinalTotalLate = 0;
				this.getOneMonthlyAttendance(this.dateRange[0], this.dateRange[1]);
			} else {
				this.FinalTotalLate = 0;
				this.getOneMonthlyAttendance(starting, ending);
				// this.getOneMonthlyAttendance(this.dateRange[0], this.dateRange[1]);
				// this.getOneMonthlyAttendance(new Date(this.selectedDate.setDate(this.selectedDate.getMonth() - 1)).toISOString(), new Date(this.selectedDate.setDate(31)).toISOString())
			}
		});

		// deleteTime socket
		this.socketDeleteInstance = sgs.ResponseSocket('deleteTime').subscribe((emitted) => {
			if (this.dateRange) {
				this.getOneMonthlyAttendance(this.dateRange[0], this.dateRange[1]);
			} else {
				this.getOneMonthlyAttendance(new Date(this.selectedDate.setDate(1)).toISOString(), new Date(this.selectedDate.setDate(31)).toISOString());
			}
		});
		this.selectedDate = new Date();

		console.log('params');
		console.log(this.route.snapshot.params['id']);
	}

	createForm() {
		this.form = this.formBuilder.group({
			totalHours: ['', [Validators.required]],
			hourlyRate: ['', [Validators.required]],
			monthlyRate: ['', [Validators.required]],
			taxable: ['', [Validators.required]],
			sss: ['', [Validators.required]],
			philHealth: ['', [Validators.required]],
			pagIbig: ['', [Validators.required]],
			widholdingTax: ['', [Validators.required]],
			totalTax: ['', [Validators.required]],
			homePay: ['', [Validators.required]],
			totalDeductions: ['', [Validators.required]],
		});
	}

	ngOnInit() {
		var start = new Date(this.selectedDate.setDate(1)).toISOString();
		this.firstDate = new Date(this.selectedDate.setDate(1)).toISOString();
		var end = new Date(this.selectedDate.setDate(31)).toISOString();
		this.secondDate = new Date(this.selectedDate.setDate(31)).toISOString();
		this.getProfile();
		this.getOneMonthlyAttendance(start, end);
	}

	ngOnDestroy() {
		this.socketInstance.unsubscribe();
	}

	handler() {
		if (this.dateRange != undefined) {
			this.getOneMonthlyAttendance(this.dateRange[0], this.dateRange[1]);
		}
	}

	getProfile() {
		this.sgs.request('get', 'user/getSecuredUser', { uid: this.route.snapshot.params['id'] }, async (response) => {
			if (response.success) {
				this.loading = false;
				this.name = response.data[0];

				this.sgs.request('get', 'employee/getEmployee', { uid: this.route.snapshot.params['id'] }, async (res) => {
					if (res.success) {
						this.profile = res.data;
						this.employment = res.data.employment;
						this.profile.yearsInService = moment().diff(res.data.dateHired, 'years', false);
						this.profile.age = moment().diff(res.data.dateOfBirth, 'years', false);
						//get current employment from employee information
						this.sgs.request('get', 'employee/getCurrentEmploymentInformation', { uid: this.route.snapshot.params['id'] }, async (curResponse) => {
							this.curEmployment = curResponse.data[0].employment;
						});
					} else {
						this.employment = [];
					}
				});
			}
		});
	}

	//test
	daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	}

	//test
	getDate() {
		var today = new Date(this.selectedDate);
		var month = today.getMonth();
		let x = this.daysInMonth(month + 1, today.getFullYear());
		this.numberofDays = _.range(1, x + 1);
	}

	time;
	totalMinutes = 0;
	totalHours = 0;
	totalLates = 0; //temporary variable that stores value to check if lates was already applied

	getOneMonthlyAttendance(start, end) {
		this.loading = true;

		this.sgs.request('get', 'day/getDays', {}, async (res) => {
			if (res.success) {
				res.data.map((e) => {
					// this.minSetHourDay= e.starts;
					// this.maxSetHourDay= e.ends;
					// this.gracePeriodDay =  e.gracePeriods;
					// this.graceTimeDay =  e.graceTime;

					this.minSetHourDay = this.rd.transform(e.starts);
					this.maxSetHourDay = this.rd.transform(e.ends);
					this.gracePeriodDay = this.rd.transform(e.gracePeriods);
					this.graceTimeDay = this.rd.transform(e.graceTime);
				});

				this.sgs.request('get', 'attendance/getOneMonthlyAttendance', { selectedStartMonth: start, selectedEndMonth: end, uid: parseInt(this.route.snapshot.params['id']) }, async (res) => {
					let lateIn = 0;

					if (res.success) {
						this.loading = false;
						this.time = res.data;
						this.time = res.data;
						this.loading = false;
						this.totalMinutes = 0;
						this.totalHours = 0;
						res.data.map((x, i) => {
							res.data[i].totalHours = 0;
							res.data[i].totalMinutes = 0;
							res.data[i].total = 0;
							res.data[i].out = x.attendance[x.attendance.length - 1].out;
							res.data[i].lates = 0;
							res.data[i].late = 0;
							this.totalLates = 0;
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

								var noonBreakStart = new Date(lunchTimeIn);
								var BreakStart = new Date(breakTimeIn);

								var noonBreakEnd = new Date(lunchTimeOut);
								var BreakEnd = new Date(breakTimeOut);

								var lunchBreak = (noonBreakEnd.valueOf() - noonBreakStart.valueOf()) / 1000;
								var lunchTotal = (noonBreakEnd.valueOf() - noonBreakStart.valueOf()) / 1000;

								lunchTotal /= 60;
								lunchTotal = Math.abs(Math.round(lunchTotal));

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

								//count lates
								let lates = 0;
								if (dt1.getTime() >= gracePeriod) {
									if (this.totalLates <= 0) {
										if (dt1.getTime() >= new Date(noonBreakStart).getTime() && dt1.getTime() <= new Date(noonBreakEnd).getTime()) {
											lates = (new Date(noonBreakStart).getTime() - minSetHour) / 1000 / 60;
										} else {
											if (dt1.getTime() <= new Date(noonBreakStart).getTime()) {
												lates = (dt1.getTime() - new Date(minSetHour).getTime()) / 1000 / 60;
											} else {
												var a = (new Date(noonBreakStart).getTime() - minSetHour) / 1000 / 60;
												var b = (dt1.getTime() - new Date(noonBreakEnd).getTime()) / 1000 / 60;
												lates = a + b;
											}
										}
									} else {
										lates += 0;
									}
									this.totalLates += 1;
								} else {
									lates = 0;
									this.totalLates += 1; // if the system finds multiple attendance, the basis of lates will be the first in only. later attendace wont effect.
								}

								//check starting/in attendance
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
											// console.log(dt1.getTime() >= new Date(dt1).setHours(9,16,0), dt1.getTime() <= new Date(dt1).setHours(9,59,0))
											if (dt1.getTime() >= gracePeriod && dt1.getTime() <= graceTime) {
												// if(dt1.getTime() >= new Date(dt1).setHours(9,16,0) && dt1.getTime() <= new Date(dt1).setHours(9,59,0)){
												dt1 = new Date(graceTime);
											} else {
												dt1 = dt1;
											}
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

								// var diff = ((dt2.getTime() - dt1.getTime()) / 1000);

								// if(diff > 1){
								//   diff = (diff/60) - lunchBreak;
								// }else{
								//   diff = 0;
								// }
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
								res.data[i].totalHours += rhours; // total hours
								res.data[i].totalMinutes += rminutes; // total Minutes

								if (y.out != null) {
									res.data[i].total += Totalminutes; // total converted minutes from date
									this.totalHours += +(rhours + '.' + rminutes.toString().padStart(2, '0'));
									this.totalMinutes += Totalminutes;
									res.data[i].lates += lates;
									res.data[i].late += lateIn;
									this.FinalTotalLate += lateIn;
									res.data[i].lunchTotal = lunchTotal;
									res.data[i].break = BreakhTotal;
									res.data[i].overtime = otTotal;
									this.FinalTotalOT += otTotal;
								}

								// this.totalMinutes += Totalminutes;
								// this.totalHours += +(rhours + "."+rminutes.toString().padStart(2, '0')); // HH + MM wherin minutes in decimal point format and hours in whole number
							});
							//if this is  remove lates will be duplicate// this is to flush value += assignment for late
							lateIn = 0;
						});
					} else {
						this.noData = res.message;
						this.loading = false;
					}
				});
			}
		});
	}

	updateTime(id, timeLogs, uid, objetId) {
		const activeModal = this.ngbModal.open(TimeLogsComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
		activeModal.componentInstance.id = id;
		activeModal.componentInstance.objetId = objetId;
		activeModal.componentInstance.firstDate = this.firstDate;
		activeModal.componentInstance.secondDate = this.secondDate;
		activeModal.componentInstance.timeLogs = timeLogs;
		activeModal.componentInstance.uid = uid;
	}
}
