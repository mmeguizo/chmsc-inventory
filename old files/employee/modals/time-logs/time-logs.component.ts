import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { UpdateTImeComponent } from '../update-time/update-time.component';

@Component({
	selector: 'ngx-time-logs',
	templateUrl: './time-logs.component.html',
	styleUrls: ['./time-logs.component.scss'],
})
export class TimeLogsComponent implements OnInit {
	public timeLogs;
	public id;
	public uid;
	public index;
	public firstDate;
	public secondDate;
	public objetId;
	public socketInstance;
	public socketDeleteInstance;

	constructor(public activeModal: NgbActiveModal, public sgs: SharedGlobalService, public ngbModal: NgbModal) {
		this.socketInstance = sgs.ResponseSocket('updateTime').subscribe((emitted) => {
			// this.timeLogs[this.index].in = emitted.data.in;
			// this.timeLogs[this.index].out = emitted.data.out;
			this.closeModal();
			// this.sgs.request('get', 'attendance/getOneMonthlyAttendance', {selectedStartMonth: this.firstDate, selectedEndMonth: this.secondDate, uid: parseInt(this.uid )}, async (res) => {
			//   res.data.map( e => {
			//     console.log('timelogs emit');
			//     console.log(e);
			//     console.log(e.attendance);
			//     e.attandance = this.timeLogs
			//   })
			// })
		});
		this.socketDeleteInstance = sgs.ResponseSocket('deleteTime').subscribe((emitted) => {});
	}

	ngOnInit() {}

	closeModal() {
		this.activeModal.close();
	}

	ngOnDestroy() {
		this.socketInstance.unsubscribe();
		this.socketDeleteInstance.unsubscribe();
	}

	// editTime(time, i) {
	// 	this.index = i;
	// 	const activeModal = this.ngbModal.open(UpdateTImeComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
	// 	activeModal.componentInstance.id = this.id;
	// 	activeModal.componentInstance.objetId = this.objetId;
	// 	activeModal.componentInstance.timeLogs = time;
	// 	activeModal.componentInstance.uid = this.uid;
	// 	activeModal.componentInstance.firstDate = this.firstDate;
	// 	activeModal.componentInstance.secondDate = this.secondDate;
	// }

	// removeTime(time) {
	// 	this.sgs
	// 		.Modal(
	// 			{
	// 				header: `Delete Employee Attendance`,
	// 				content: `Are you sure to delete this attendance?`,
	// 				type: 'confirmation',
	// 			},
	// 			{ size: 'sm' }
	// 		)

	// 		.confirm.subscribe((response) => {
	// 			if (response) {
	// 				this.sgs.request('put', 'attendance/deleteAttendance', { id: this.id, tid: time._id, uid: this.uid }, (response) => {
	// 					this.sgs.Toaster('warning', 'Warning', 'Employee attendance has been deleted.');
	// 					const index: number = this.timeLogs.indexOf(time);
	// 					this.timeLogs.splice(index, 1);
	// 				});
	// 			}
	// 		});
	// }

	// removeTimeWithError() {
	// 	this.sgs.Modal(
	// 		{
	// 			header: `Error Message`,
	// 			content: `Sorry, but atleast 1 attendance should be retain per schedule. for more info please contact your system administrator.`,
	// 		},
	// 		{ size: 'sm' }
	// 	);
	// }
}
