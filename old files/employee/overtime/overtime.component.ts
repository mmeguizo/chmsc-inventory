import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NbPopoverDirective } from '@nebular/theme';
import { AddOvertimeComponent } from '../modals/add-overtime/add-overtime.component';
import { AuthService } from '../../@core/services/auth.service';
import { EditOvertimeComponent } from '../modals/edit-overtime/edit-overtime.component';
import { ReverseDate } from '../../@core/pipes/dataFilter';
import * as moment from 'moment';

@Component({
	selector: 'ngx-overtime',
	templateUrl: './overtime.component.html',
	styleUrls: ['./overtime.component.scss'],
})
export class OvertimeComponent implements OnInit {
	public loading = false;
	public data = [];

	public socketTrigger;
	public mainID;
	public hourTotal;

	//search variables
	public filterQuery = '';
	public sortBy = 'id';
	public sortOrder = 'desc';
	public selectQueryString = 'Name';
	public selectQuery = 'id';
	public employeeID = 0;

	@ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
	@ViewChild('search', { static: false }) nameField: ElementRef;

	constructor(public sgs: SharedGlobalService, public ngbModal: NgbModal, public auth: AuthService, public activeModal: NgbActiveModal, public rd: ReverseDate) {
		this.socketTrigger = sgs.ResponseSocket('overtime').subscribe((emit) => {
			emit && this.getAllOvertime();
		});

		this.employeeID = this.auth.getTokenData('id');
	}

	ngOnInit() {
		this.getAllOvertime();
	}

	getAllOvertime() {
		this.sgs.request('get', 'overtime/getAllOvertime', { id: this.employeeID }, (res) => {
			console.log(res.data);

			//get total OT hours
			res.data.map((e) => {
				var start = moment(new Date(this.rd.transform(e.start)));
				var end = moment(new Date(this.rd.transform(e.end)));
				var duration = moment.duration(start.diff(end));
				var minutes = duration.asMinutes();
				e.minTotal = Math.abs(Math.round(minutes));
				//end of calculatoins
			}),
				res.success ? [(this.data = res.data), (this.loading = false)] : [(this.data = []), (this.loading = false)];
			//get total OT hours
			// this.data.map(e => this.mainID = e.id)
		});
	}

	newRequest() {
		const activeModal = this.ngbModal.open(AddOvertimeComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
		activeModal.componentInstance.empID = this.auth.getTokenData('id');
	}

	deleteOT(id) {
		this.sgs
			.Modal(
				{
					header: ` Delete Requested ID ${id}?`,
					content: `Click Yes to Delete `,
					type: `confirmation`,
				},
				{ size: 'sm' }
			)
			.confirm.subscribe((response) => {
				response &&
					this.sgs.request('put', 'overtime/deleteOT', { id: id }, async (res) => {
						res.success && [this.sgs.showToaster('success', 'Deleted Successfully.', 'Success', 3000, 'bottom-right'), this.closeModal()];
						!res.success && [this.sgs.showToaster('warning', 'Unable to Delete.', 'Ooops', 3000, 'bottom-right'), this.closeModal()];
					});
			});
	}
	update(data) {
		const activeModal = this.ngbModal.open(EditOvertimeComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height' });
		activeModal.componentInstance.overtime = data;
	}

	reason(reason) {
		this.sgs.Modal({ header: 'Reason for OT', content: `📌 ${reason} `, buttonName: 'close' }, { size: 'sm' });
	}

	selectFilter(name, value) {
		this.selectQuery = name;
		this.selectQueryString = value;
		this.popover.hide();
		setTimeout(() => this.nameField.nativeElement.focus(), 0);
		this.filterQuery = '';
	}

	ngOnDestroy(): void {
		this.socketTrigger.unsubscribe();
	}

	closeModal() {
		this.activeModal.close();
	}
}
