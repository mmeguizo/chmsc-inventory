import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

@Component({
	selector: 'ngx-add-event',
	templateUrl: './add-working-days.component.html',
	styleUrls: ['./add-working-days.component.scss'],
})
export class AddWorkingDaysComponent implements OnInit {
	yid;
	mid;
	cnt;
	month;
	minDate: Date;
	maxDate: Date;
	public form: FormGroup;
	public workingDaysHours: FormArray;

	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService) {
		this.createForm();
		// this.minDate = new Date();
		// this.maxDate = new Date();
	}

	ngOnInit() {
		this.minDate = new Date('2019-' + this.cnt + '-01');
		var lastDay = new Date(this.minDate.getFullYear(), this.minDate.getMonth() + 1, 0);
		this.maxDate = new Date(lastDay);
	}

	createForm() {
		this.form = this.formBuilder.group({
			workingDays: ['', [Validators.required]],
			start: ['', [Validators.required]],
			grace: ['', [Validators.required]],
			graceTime: ['', [Validators.required]],
			end: ['', [Validators.required]],
			lunch: ['', [Validators.required]],
			break: ['', [Validators.required]],
			dayOff: ['', [Validators.required]],
			dayOffLabel: ['', [Validators.required]],
		});
	}

	addWorkingDays(data) {
		console.table(data.value);

		this.sgs.request('post', 'day/addWorkingDays', { data: data.value }, async (res) => {
			if (res.success) {
				this.sgs.Toaster('success', 'Success', 'New days has been successfully created!');
				this.closeModal();
			}
		});
	}

	closeModal() {
		this.activeModal.close();
	}
}
