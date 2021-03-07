import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as _ from 'lodash';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReverseDate } from '../../../@core/pipes/dataFilter';
// import { forEach } from '@angular/router
// import { forEach } from '@angular/router/src/utils/collection';

@Component({
	selector: 'ngx-payslip',
	templateUrl: './payslip.component.html',
	styleUrls: ['./payslip.component.scss'],
})
export class PayslipComponent implements OnInit {
	public form; //form builder form
	public toDate = new Date();
	public filterQuery = '';
	public sortBy = 'actualDate';
	public sortOrder = 'asc';
	public selectQueryString = 'Last Name';
	public selectQuery = 'lname';
	public data;
	public loading = true;
	public noData;
	public OTflag;
	public profile;
	public employment;
	public selectedDate;
	public numberofDays;
	public curEmployment;
	public eid; // employee ID
	public cutOffFrom;
	public cutOffTo;
	public loansInfo = [];
	public pid; // payslipt ID
	public btnStatus = true; // to add or update
	public noEmployeeProfile = false;
	public loansList = [];
	public status;
	public latesInfo = []; // get late info
	totalFinalLates = 0;
	totalFinalOT = 0;
	totalFinalLatesArray = [];
	loanType = [];
	adminView;
	public minSetHourDay;
	public maxSetHourDay;
	public gracePeriodDay;
	public graceTimeDay;
	public approvedOT;
	public overtimeIDs;
	public PastovertimeIDs;
	public PastOT;
	finallates = 0;

	constructor(public sgs: SharedGlobalService, public ngbModal: NgbModal, public formBuilder: FormBuilder, public activeModal: NgbActiveModal, public rd: ReverseDate) {
		this.createForm();
		this.selectedDate = new Date();
	}

	createForm() {
		this.form = this.formBuilder.group({
			totalHours: ['', [Validators.required]],
			totalOT: ['', [Validators.required]],
			hourlyRate: ['', [Validators.required]],
			monthlyRate: ['', [Validators.required]],
			taxable: ['', [Validators.required]],

			sss: ['', [Validators.required]],
			philHealth: ['', [Validators.required]],
			pagIbig: ['', [Validators.required]],

			comp_sss: ['', [Validators.required]],
			comp_philHealth: ['', [Validators.required]],
			comp_pagIbig: ['', [Validators.required]],

			widholdingTax: ['', [Validators.required]],
			totalTax: ['', [Validators.required]],
			homePay: ['', [Validators.required]],
			totalDeductions: ['', [Validators.required]],
			creditabletax: ['', [Validators.required]],
			// loans:                    ['', [Validators.required]],

			allowance: [''],
		});
	}

	ngOnInit() {
		//check payroll if exist, then load data

		// console.log(this.pid);
		// console.log(this.eid);

		this.sgs.request('get', 'payroll/checkPayrollIfExist', { pid: this.pid, eid: this.eid }, async (res) => {
			if (res.success) {
				this.getOneMonthlyAttendance();
				this.getProfile(1);

				this.btnStatus = false;

				this.form = this.formBuilder.group({
					totalHours: [res.data.totalHours, [Validators.required]],
					totalOT: [res.data.totalOT, [Validators.required]],
					PastOT: [res.data.PastOT || 0, [Validators.required]],
					totalLates: [res.data.late / 60 || 0, [Validators.required]],
					hourlyRate: [res.data.hourlyRate, [Validators.required]],
					monthlyRate: [res.data.monthlyRate, [Validators.required]],
					taxable: [res.data.netPay, [Validators.required]],

					sss: [res.data.sss, [Validators.required]],
					philHealth: [res.data.philHealth, [Validators.required]],
					pagIbig: [res.data.pagIbig, [Validators.required]],
					lateDeduct: [res.data.late * res.data.hourlyRate, [Validators.required]],
					widholdingTax: [res.data.wTax, [Validators.required]],
					totalTax: [res.data.totalTax, [Validators.required]],

					homePay: [res.data.takeHomePay, [Validators.required]],
					totalDeductions: [res.data.totalDeductions, [Validators.required]],
					creditabletax: [res.data.wTax, [Validators.required]],
					//   loans:                    [res.data.loans.amount, [Validators.required]]
				});
			} else {
				this.btnStatus = true;
				this.getOneMonthlyAttendance();
				this.getProfile(2);
				this.getSSSTable();
				this.getPHTable();
				this.getPagIbitTable();
				this.getTaxTable();
				// this.getActiveEmployeeLoan();  temp, uncomment if done
			}
			//  this.getActiveEmployeeLoan(); // delete and uncomment if done
		});
	}

	getProfile(type) {
		// console.log('type');
		// console.log(type);

		this.sgs.request('get', 'user/getSecuredUser', { uid: this.eid }, async (response) => {
			if (response.success) {
				this.data = response.data[0];
				this.sgs.request('get', 'employee/getEmployee', { uid: this.eid }, async (res) => {
					if (res.success) {
						this.profile = res.data;
						this.employment = res.data.employment;
						this.profile.yearsInService = moment().diff(res.data.dateHired, 'years', false);
						this.profile.age = moment().diff(res.data.dateOfBirth, 'years', false);
						//get current employment from employee information
						this.sgs.request('get', 'employee/getCurrentEmploymentInformation', { uid: this.eid }, async (curResponse) => {
							this.curEmployment = curResponse.data[0].employment;
							if (type == 2) {
								await this.paySlip(true);
							} else {
								this.loading = false;
							}
						});
					} else {
						this.noEmployeeProfile = true;
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

	getOneMonthlyAttendance() {
		this.loading = true;
		// test | do not remove.
		// var start = new Date(this.selectedDate.setDate(1)).toISOString();
		// var end = new Date(this.selectedDate.setDate(31)).toISOString();
		var start = new Date(this.cutOffFrom);
		var end = new Date(this.cutOffTo);

		// console.log('getOneMonthlyAttendance');
		// console.log({selectedStartMonth: start, selectedEndMonth: end, uid: this.eid});

		this.sgs.request('get', 'day/getDays', {}, async (res) => {
			if (res.success) {
				res.data.map((e) => {
					this.minSetHourDay = this.rd.transform(e.starts);
					this.maxSetHourDay = this.rd.transform(e.ends);
					this.gracePeriodDay = this.rd.transform(e.gracePeriods);
					this.graceTimeDay = this.rd.transform(e.graceTime);
				});

				this.sgs.request('get', 'attendance/getOneMonthlyAttendance', { selectedStartMonth: start, selectedEndMonth: end, uid: this.eid, payrollid: this.pid }, async (res) => {
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
												// lates = a + b;
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
									this.totalFinalLates += lates;
									this.totalFinalOT += otTotal;
									this.totalFinalLatesArray.push(lates);
									res.data[i].lunchTotal = lunchTotal;
									res.data[i].break = BreakhTotal;
									res.data[i].overtime = otTotal;
								}
							});
						});
					} else {
						this.noData = res.message;
						this.loading = false;
					}
				});
			}
		});
	}

	isPaySlip = false;
	taxableIncome = 0;
	sss = 0;
	compSSS = 0;
	philHealth = 0;
	compPhilHealth = 0;
	pagIbig = 0;
	compPagIbig = 0;
	creditabletax = 0;
	totalTax = 0;
	//loans=0;
	homePay = 0;
	totalDeductions = 0;

	paySlip(status) {
		console.log('PastOT');
		console.log(typeof this.PastOT);
		console.log(this.PastOT);

		let lateTotality = (this.totalFinalLates / 60) * this.curEmployment.hourlyRate;

		this.isPaySlip = status;
		if (status == true) {
			if (!this.approvedOT) {
				this.approvedOT = 0;
			}
			if (!this.PastOT) {
				this.PastOT = 0;
			}

			console.log('PastOT');
			console.log(typeof this.PastOT);
			console.log(this.PastOT);

			//compute
			// this.taxableIncome = (this.totalMinutes / 60) * this.curEmployment.hourlyRate;
			// this.taxableIncome = parseFloat(parseFloat(String(this.totalMinutes/60)).toFixed(2)) * this.curEmployment.hourlyRate;
			this.taxableIncome = (this.totalMinutes / 60 + this.approvedOT + this.PastOT) * this.curEmployment.hourlyRate;
			// this.taxableIncome = (parseFloat(parseFloat(String(this.totalMinutes/60)).toFixed(2))  +  this.approvedOT) * this.curEmployment.hourlyRate;
			// check sss table
			//add approved ot or zero if none

			this.sssTable.table.map((x) => {
				if (this.taxableIncome >= x.rcFrom === this.taxableIncome <= x.rcTo) {
					this.sss = x.ssEE;
					this.compSSS = (x.ssER + x.ecER) / 2;
				}
			});
			// check philHealth table
			this.phTable.table.map((x) => {
				if (this.taxableIncome >= x.mbsFrom === this.taxableIncome <= x.mbsTo && this.taxableIncome <= 10000) {
					this.philHealth = x.esFrom / 2;
					this.compPhilHealth = x.esFrom / 2;
				} else if (this.taxableIncome >= x.mbsFrom === this.taxableIncome <= x.mbsTo && this.taxableIncome <= 39999) {
					this.philHealth = (this.taxableIncome * this.phTable.percentage) / 100 / 2;
					this.compPhilHealth = (this.taxableIncome * this.phTable.percentage) / 100 / 2;
				} else if (this.taxableIncome >= 40000) {
					this.philHealth = x.esFrom / 2;
					this.compPhilHealth = x.esFrom / 2;
				}
			});
			// check pagIbig table
			this.piTable.table.map((x) => {
				if (this.taxableIncome >= x.mcFrom === this.taxableIncome <= x.mcTo) {
					this.pagIbig = (this.taxableIncome * x.ees) / 100;
					this.compPagIbig = (this.taxableIncome * x.ers) / 100;
					// if(this.taxableIncome >= 5000){
					//   this.pagIbig = ((5000 * x.ees) / 100);
					//   this.
					// }else{
					//   this.pagIbig = ((this.taxableIncome * x.ees) / 100);
					// }
				}
			});
			// check TAX
			// tax will be computed base on the annual income or monthly salary * 12
			this.taxTable.table.map((x) => {
				var OneYearRate = this.curEmployment.monthlySalary * 12;
				var OneYearPagIbig = this.pagIbig * 12;
				var OneYearPhilHealth = this.philHealth * 12;
				var OneYearSSS = this.sss * 12;
				var OneYearContribution = OneYearPagIbig + OneYearPhilHealth + OneYearSSS;
				var thirteenthMonth = this.curEmployment.monthlySalary;
				var taxableIncome = OneYearRate - OneYearContribution;
				if (taxableIncome > x.lowerLimit === taxableIncome < x.upperLimit) {
					var minTaxAmount = taxableIncome - x.lowerLimit;
					var monthlyTax = (x.taxOnExcess * minTaxAmount) / 100;
					this.creditabletax = x.taxOnLower + monthlyTax / 12;
					this.totalTax = 0;
				}
			});

			//compute overall

			// this.totalDeductions = this.creditabletax + this.sss + this.philHealth + this.pagIbig + this.loans + lateTotality;
			this.totalDeductions = this.creditabletax + this.sss + this.philHealth + this.pagIbig;
			// this.totalDeductions = this.creditabletax + this.sss + this.philHealth + this.pagIbig  + lateTotality;

			// console.log('this.totalDeductions');
			// console.log(this.totalDeductions);

			this.homePay = this.taxableIncome - this.totalDeductions;

			// console.log('this.homePay');
			// console.log(this.homePay);

			this.form = this.formBuilder.group({
				totalHours: [this.totalMinutes / 60, [Validators.required]],
				totalOT: [this.approvedOT || 0, [Validators.required]],
				PastOT: [this.PastOT || 0, [Validators.required]],
				totalLates: [this.totalFinalLates / 60 || 0, [Validators.required]],
				hourlyRate: [this.curEmployment.hourlyRate, [Validators.required]],
				monthlyRate: [this.curEmployment.monthlySalary, [Validators.required]],
				taxable: [this.taxableIncome, [Validators.required]],

				sss: [this.sss, [Validators.required]],
				philHealth: [this.philHealth, [Validators.required]],
				pagIbig: [this.pagIbig, [Validators.required]],
				lateDeduct: [lateTotality, [Validators.required]],

				comp_sss: [this.compSSS],
				comp_pagIbig: [this.compPagIbig],
				comp_philHealth: [this.compPhilHealth],

				creditabletax: [this.creditabletax, [Validators.required]],
				//loans:                    [this.loans, [Validators.required]],
				totalTax: [this.totalTax, [Validators.required]],
				homePay: [this.homePay, [Validators.required]],
				totalDeductions: [this.totalDeductions, [Validators.required]],
			});
			this.loading = false;
		}
	}

	sssTable;

	getSSSTable() {
		this.sgs.request('get', 'sssTable/getActiveSSSTable', null, async (res) => {
			if (res.success) {
				this.sssTable = res.data;
			}
		});
	}

	phTable;
	getPHTable() {
		this.sgs.request('get', 'phTable/getActivePHTable', null, async (res) => {
			if (res.success) {
				this.phTable = res.data;
				// console.log(this.phTable);
			}
		});
	}

	piTable;
	getPagIbitTable() {
		this.sgs.request('get', 'piTable/getActivePITable', null, async (res) => {
			this.piTable = res.data;
			// console.log(this.piTable);
		});
	}

	taxTable;
	getTaxTable() {
		this.sgs.request('get', 'taxTable/getActiveTaxTable', null, async (res) => {
			this.taxTable = res.data;
		});
	}

	create() {
		this.sgs
			.Modal(
				{
					header: `No more Undo`,
					content: `Agreeing will finalize the payslip`,
					type: `confirmation`,
				},
				{ size: 'sm' }
			)
			.confirm.subscribe((response) => {
				if (response) {
					if (!this.overtimeIDs || this.overtimeIDs === undefined) {
						this.overtimeIDs = [];
					}
					if (!this.PastovertimeIDs || this.PastovertimeIDs === undefined) {
						this.PastovertimeIDs = [];
					}
					console.log('create');
					console.log(this.overtimeIDs);
					console.log(this.PastovertimeIDs);

					// set the overtime data to paid
					this.sgs.request('put', 'overtime/updatePaid', { id: [...this.overtimeIDs, ...this.PastovertimeIDs] }, async (res) => {
						if (res.success) {
							this.sgs.request(
								'post',
								'payroll/addPayslip',
								{
									eid: this.eid,
									// loansInfo: [],
									form: this.form.value,
									pid: this.pid,
								},
								async (res) => {
									if (res.success) {
										this.loading = false;
										this.sgs.Toaster('success', 'Success', 'Payslip has been created successfully');
										this.closeModal();
									}
								}
							);
						}
					});
				}
			});
	}

	updatePayslip() {
		this.sgs.request(
			'post',
			'payroll/updatePayslip',
			{
				eid: this.eid,
				form: this.form.value,
				pid: this.pid,
			},
			async (res) => {
				if (res.success) {
					this.sgs.Toaster('success', 'Success', 'Payslip has been updated successfully');
				}
			}
		);
	}

	closeModal() {
		this.activeModal.close();
	}
}
