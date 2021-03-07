import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddWorkingDaysComponent } from '../modals/add-working-days/add-working-days.component';
import { EditWorkingDaysComponent } from '../modals/edit-working-days/edit-working-days.component';

@Component({
	selector: 'ngx-working-days',
	templateUrl: './working-days.component.html',
	styleUrls: ['./working-days.component.scss'],
})
export class WorkingDaysComponent implements OnInit {
	loading = true;
	days;
	goBack;
	selectedDay: any;
	workingDays = [];
	offs = [];
	conditionalOffDay = [];
	label: any;
	id: any;
	socketInstance: any;
	copydays: any;
	flag: boolean;
	offflag: boolean;
	grace: any;
	grace_minutes: any;
	constructor(public sgs: SharedGlobalService, private route: ActivatedRoute, private formBuilder: FormBuilder, public ngbModal: NgbModal, public activeModal: NgbActiveModal) {
		this.socketInstance = sgs.ResponseSocket('days').subscribe((emitted) => {
			this.getDays();
		});
	}

	ngOnInit() {
		this.getDays();
		this.selectMonth();
	}

	getDays() {
		this.sgs.request('get', 'day/getDays', {}, async (res) => {
			console.log('getdays');
			console.log(res.data);

			if (res.success) {
				let workDay = [];
				let offDay = [];

				res.data.map((e) => {
					workDay.push(e.workingDays);
					offDay.push(e.dayOff);
					(this.label = e.dayofflabel), (this.id = e.id), (this.days = res.data);
					this.copydays = res.data;
					this.workingDays = workDay[0];
					this.offs = offDay[0];
					this.conditionalOffDay = e.conditionalOffday;
					this.loading = false;
					this.flag = false;
				});
			} else {
				this.days = [];
				this.loading = false;
				this.flag = true;
			}
		});
	}

	setDay(id, val) {
		if (val == false) {
			val = true;
		} else {
			val = false;
		}
		this.sgs.request('post', 'day/setDay', { id: id, status: val }, async (res) => {
			if (res.success) {
				console.log('set day Success');
			}
		});
	}

	selectMonth(day = 'monday') {
		this.selectedDay = day;

		if (this.conditionalOffDay.includes(this.selectedDay)) {
			return (this.days = []);
		} else {
			return (this.days = this.copydays);
		}
	}
	editWorking() {
		console.log(this.id);
		const activeModal = this.ngbModal.open(EditWorkingDaysComponent, { size: 'md', container: 'nb-layout', windowClass: 'min_height' });
		activeModal.componentInstance.id = this.id;
	}

	addWorkingDays() {
		const activeModal = this.ngbModal.open(AddWorkingDaysComponent, { size: 'md', container: 'nb-layout', windowClass: 'min_height' });
	}

	closeModal() {
		this.activeModal.close();
	}
}
