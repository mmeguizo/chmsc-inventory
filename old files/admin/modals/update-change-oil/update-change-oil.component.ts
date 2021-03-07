import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import * as moment from 'moment';
import { ReverseDate } from '../../../@core/pipes/dataFilter';

@Component({
	selector: 'ngx-update-change-oil',
	templateUrl: './update-change-oil.component.html',
	styleUrls: ['./update-change-oil.component.scss'],
})
export class UpdateChangeOilComponent implements OnInit {
	public id;
	public truck: any;
	public changeOil: any;
	public gearOil: any;
	public needGearOil: any;
	public needChangeOil: any;
	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService, public rd: ReverseDate) {}

	ngOnInit(): void {
		console.log('this.truck update change oil');
		console.log(this.truck);

		//	this.formatDateTime();

		this.id = this.truck.id;
		this.changeOil = this.rd.transform(this.truck.lastChangeOil) || '';
		this.gearOil = this.rd.transform(this.truck.lastGearOil) || '';
		this.needChangeOil = this.rd.transform(this.truck.nextChangeOil) || '';
		this.needGearOil = this.rd.transform(this.truck.nextGearOil) || '';

		console.log('this.id @@@@', this.id);
	}

	// formatDateTime() {
	// 	this.changeOil = moment(this.truck.lastChangeOil).format('MM/DD/YYYY');
	// 	this.gearOil = moment(this.truck.lastGearOil).format('MM/DD/YYYY');
	// 	this.needChangeOil = moment(this.truck.nextChangeOil).format('MM/DD/YYYY');
	// 	this.needGearOil = moment(this.truck.nextGearOil).format('MM/DD/YYYY');
	// }

	closeModal() {
		this.activeModal.close();
	}

	update() {
		console.log('this.id update', this.id);

		if (this.needGearOil != undefined && this.needChangeOil != undefined) {
			this.sgs.request(
				'post',
				'truck/updateChangeOil',
				{
					truckId: this.id,
					nextChangeOil: new Date(this.needChangeOil),
					nextGearOil: new Date(this.needGearOil),
					lastGearOil: new Date(this.gearOil),
					lastChangeOil: new Date(this.changeOil),
				},
				async (res) => {
					console.log(res);

					if (res.success) {
						this.closeModal();
						this.sgs.showToaster('success', 'Update next change oil and gear oil successfully.', 'Success', 2000, 'bottom-right');
					} else {
						this.closeModal();
						this.sgs.showToaster('warning', 'Error updating!.', 'Warning', 2000, 'bottom-right');
					}
				}
			);
		} else {
			this.sgs.showToaster('warning', 'Select date for next change oil and gear oil.', 'Warning', 2000, 'bottom-right');
		}
	}
}
