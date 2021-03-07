import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ReverseDate } from '../../../@core/pipes/dataFilter';

@Component({
	selector: 'ngx-add-event',
	templateUrl: './edit-working-days.component.html',
	styleUrls: ['./edit-working-days.component.scss'],
})
export class EditWorkingDaysComponent implements OnInit {
	yid;
	mid;
	cnt;
	id;
	month;
	workingDaysSet = [];
	minDate: Date;
	maxDate: Date;
	selectedItem: any;
	public form: FormGroup;
	public workingDaysHours: FormArray;

	workingDays: any;
	start: any;
	end: any;
	grace: any;
	lunch: any;
	break: any;
	dayOff: any;
	dayOffLabel: any;

	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService, public rd: ReverseDate) {
		this.createForm();
		// this.minDate = new Date();
		// this.maxDate = new Date();
	}

	ngOnInit() {
		this.minDate = new Date('2019-' + this.cnt + '-01');
		var lastDay = new Date(this.minDate.getFullYear(), this.minDate.getMonth() + 1, 0);
		this.maxDate = new Date(lastDay);
		this.selectedItem = ['saturday'];

		this.createForm();
	}

	createForm() {
		this.form = this.formBuilder.group({
			workingDays: ['', [Validators.required]],
			start: ['', [Validators.required]],
			end: ['', [Validators.required]],
			grace: ['', [Validators.required]],
			lunch: ['', [Validators.required]],
			break: ['', [Validators.required]],
			dayOff: ['', [Validators.required]],
			dayOffLabel: ['', [Validators.required]],
			graceTime: ['', [Validators.required]],
		});

		this.sgs.request('get', 'day/getDays', { id: this.id }, async (res) => {
			console.log(res.data);
			res.data.map((e) => {
				console.log(e);

				this.form.controls['workingDays'].patchValue(e.workingDays, { onlySelf: true });
				this.form.controls['start'].patchValue(this.rd.transform(e.starts), { onlySelf: true });
				this.form.controls['end'].patchValue(this.rd.transform(e.ends), { onlySelf: true });
				this.form.controls['grace'].patchValue(this.rd.transform(e.gracePeriods), { onlySelf: true });
				this.form.controls['lunch'].patchValue(e.lunch, { onlySelf: true });
				this.form.controls['break'].patchValue(e.break, { onlySelf: true });
				this.form.controls['dayOffLabel'].patchValue(e.dayofflabel, { onlySelf: true });
				this.form.controls['dayOff'].patchValue(e.dayOff, { onlySelf: true });
				this.form.controls['graceTime'].patchValue(this.rd.transform(e.graceTime), { onlySelf: true });
			});
		});
	}

	editWorkingDays(data) {
		this.sgs
			.Modal(
				{
					header: ` Replacing Working Days and Hours`,
					content: `Choose Yes to Cont. and No to cancel`,
					type: `confirmation`,
				},
				{ size: 'sm' }
			)
			.confirm.subscribe((response) => {
				if (response) {
					this.sgs.request('put', 'day/updateDays', { id: this.id }, async (res) => {
						//if success deleting the old one
						if (res.success) {
							//proceed adding a new one
							this.sgs.request('post', 'day/addWorkingDays', { data: data.value }, async (res) => {
								if (res.success) {
									this.sgs.Toaster('success', 'Success', 'New days has been successfully created!');
									this.closeModal();
								}
							});
						}
					});
				} else {
					this.closeModal();
				}
			});
	}

	closeModal() {
		this.activeModal.close();
	}

	compareById(optionOne, optionTwo): boolean {
		return optionOne.name === optionTwo.name;
	}
}
