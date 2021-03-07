import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import * as moment from 'moment';

@Component({
	selector: 'ngx-update-truck-file',
	templateUrl: './update-truck-file.component.html',
	styleUrls: ['./update-truck-file.component.scss'],
})
export class UpdateTruckFileComponent implements OnInit {
	public form: any;
	public engine: any;
	public chassis: any;
	public gearBox: any;
	public brakes: any;
	public operatingCharacteristics: any;
	public categoryData = [];
	public typeData = [];
	public data: any;
	public loading = true;
	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService) {}

	ngOnInit() {
		console.log(this.data);

		this.createForm();
		this.checkCategory();
		this.checkType();
	}
	createForm() {
		let registerDate = moment(this.data.dateRegister).format('MM/DD/YYYY');
		let expireDate = moment(this.data.renewal).format('MM/DD/YYYY');
		let expireInsuranceDate = moment(this.data.insuranceRenewal).format('MM/DD/YYYY');
		this.form = this.formBuilder.group({
			category: [this.data.category],
			truckModel: [this.data.truckModel],
			truckType: [this.data.truckType],
			plate: [this.data.plate],
			engine: [this.data.engine],
			chassis: [this.data.chassis],
			color: [this.data.color],
			weight: [this.data.weight],
			length: [this.data.length],
			capacity: [this.data.capacity],
			tireSize: [this.data.tireSize],
			batterySize: [this.data.batterySize],
			garage: [this.data.garage],
			or: [this.data.or],
			cr: [this.data.cr],
			dateRegister: [registerDate],
			renewal: [expireDate],
			insurance: [this.data.insurance],
			insuranceRenewal: [expireInsuranceDate],
		});

		this.form.get;
	}

	update() {
		this.sgs.request(
			'post',
			'truck/updateVehicle',
			{
				id: this.data.id,
				form: this.form.value,
				logs: this.data.logs,
			},
			async (res) => {
				if (res.success) {
					this.sgs.showToaster('success', 'Truck information has been updated.', 'Success', 2000, 'bottom-right');
					this.closeModal();
				}
			}
		);
	}

	checkCategory() {
		this.sgs.request('get', 'category/checkCategory', null, async (res) => {
			if (res.success) {
				this.categoryData = await res.data;
			} else {
				this.categoryData = [];
			}
		});
	}

	checkType() {
		this.sgs.request('get', 'type/checkType', null, async (res) => {
			if (res.success) {
				this.typeData = await res.data;
			} else {
				this.typeData = [];
			}
		});
	}

	closeModal() {
		this.activeModal.close();
	}

	compareById(optionOne, optionTwo): boolean {
		console.log('compareById', optionOne, optionTwo);

		return optionOne === optionTwo;
	}
}
