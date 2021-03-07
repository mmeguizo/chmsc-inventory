import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayslipComponent } from '../modals/payslip/payslip.component';
import { AuthService } from '../../@core/services/auth.service';
import { PrintPayslipComponent } from '../modals/print-payslip/print-payslip.component';
import * as moment from 'moment';
import { ReverseDate } from '../../@core/pipes/dataFilter';

SharedGlobalService;

@Component({
	selector: 'ngx-my-payslip',
	templateUrl: './my-payslip.component.html',
	styleUrls: ['./my-payslip.component.scss'],
})
export class MyPayslipComponent implements OnInit {
	activePayroll: any;
	public loading = true;
	public minDate = Date;
	data = [];
	id: any;
	socketInstance;
	socketInstance1;
	socketInstance2;
	myId: any;
	overtimeIDs = [];
	alltotalOT: number;

	constructor(public sgs: SharedGlobalService, public ngbModal: NgbModal, public auth: AuthService, public rd: ReverseDate) {
		this.myId = this.auth.getTokenData('id');
		this.socketInstance = sgs.ResponseSocket('attendance').subscribe((emitted) => {
			this.getAllPayroll();
			this.getActivePayroll();
		});
		this.socketInstance2 = sgs.ResponseSocket('newPayslip').subscribe((emitted) => {
			this.getAllPayroll();
			this.getActivePayroll();
		});
		this.socketInstance1 = sgs.ResponseSocket('printed').subscribe((emitted) => {
			this.getAllPayroll();
			this.getActivePayroll();
		});
	}

	ngOnInit(): void {
		this.getAllPayroll();
		this.myId = this.auth.getTokenData('id');
	}

	ngOnDestroy() {
		this.socketInstance.unsubscribe();
		this.socketInstance1.unsubscribe();
		this.socketInstance2.unsubscribe();
	}

	getAllPayroll() {
		this.sgs.request('get', 'payroll/getMyPayroll', { id: this.myId }, async (res) => {
			if (res.success) {
				this.loading = false;
				this.data = res.data;
				console.log(this.data);
				console.log(this.myId);

				if (res.data.length >= 1) {
					this.minDate = res.data[0].cutOffTo;
				}
			} else {
				this.data = [];
			}
		});
	}

	getActivePayroll() {
		this.sgs.request('get', 'payroll/getSelectedPayroll', { id: this.id }, async (res) => {
			if (res.success) {
				this.activePayroll = res.data;
				// console.log(this.activePayroll);
			}
		});
	}

	viewMyPay(data) {
		this.sgs.request('get', 'overtime/getAllOvertime', { id: this.auth.getTokenData('id') }, async (response) => {
			//SEPARATE THIS CUT OFF AND OTHER CUT OFF FOUND FOR THIS EMPLOYEE
			await response.data.filter((e) => {
				//THIS IS FOR OTHER CUT OFF
				var start = moment(new Date(this.rd.transform(e.start)));
				var end = moment(new Date(this.rd.transform(e.end)));
				var duration = moment.duration(start.diff(end));
				var minutes = duration.asMinutes();
				var totals = Math.abs(Math.round(minutes));
				totals /= 60;
				e.minTotal = totals;
				this.alltotalOT = totals;
				//THIS IS FOR THE CURRENT CUT OFF
			});
			await this.sgs
				.Modal(
					{
						header: `Found OT ${this.alltotalOT > 1 ? this.alltotalOT + ' hrs' : this.alltotalOT + ' hr'} for this Cut off `,
						content: `Admin or HR approval is needed to included OT in the Payslip, Proceeding will agree to \n not include the OT to this Payslip`,
						type: `confirmation`,
					},
					{ size: 'sm' }
				)
				.confirm.subscribe((response) => {
					if (response) {
						const activeModal = this.ngbModal.open(PayslipComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
						activeModal.componentInstance.eid = this.auth.getTokenData('id');
						activeModal.componentInstance.cutOffFrom = data.cutOffFrom;
						activeModal.componentInstance.cutOffTo = data.cutOffTo;
						activeModal.componentInstance.pid = data.id;
					}
				});
		});
	}

	print(data) {
		let summary: any;
		data.summary.map((e) => (summary = e));

		const activeModal = this.ngbModal.open(PrintPayslipComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
		activeModal.componentInstance.summary = summary;
		activeModal.componentInstance.from = data.cutOffFrom;
		activeModal.componentInstance.to = data.cutOffTo;
		activeModal.componentInstance.dateAdded = data.dateAdded;
		activeModal.componentInstance.payrollID = data.id;
	}
}
