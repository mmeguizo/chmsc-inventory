import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import * as _ from 'lodash';

import { async } from '@angular/core/testing';
@Component({
	selector: 'ngx-add-truck-type',
	templateUrl: './add-truck-type.component.html',
	styleUrls: ['./add-truck-type.component.scss'],
})
export class AddTruckTypeComponent implements OnInit {
	public form: any;
	typeData = [];
	loading = true;
	public socketInstance;

	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService) {
		this.createForm();
		this.socketInstance = sgs.ResponseSocket('addType').subscribe((emitted) => {
			if (emitted) {
				this.typeData.push(emitted.data.data);
			}
		});
		this.socketInstance = sgs.ResponseSocket('updateType').subscribe((emitted) => {
			if (emitted) {
				const update = _.findIndex(this.typeData, { id: emitted.data.id });
				this.typeData.splice(update, 1, emitted.data);
			}
		});
	}

	ngOnInit(): void {
		this.checkType();
	}

	createForm() {
		this.form = this.formBuilder.group({
			id: [''],
			type: ['', [Validators.required]],
		});
	}

	closeModal() {
		this.activeModal.close();
	}

	save() {
		if (this.form.value.id === '') {
			this.sgs.request('post', 'type/addType', { form: this.form.value }, async (res) => {
				if (res.success) {
					this.form.patchValue({
						id: '',
						type: '',
					});
					this.sgs.showToaster('success', 'Type added successfully...', 'Success', 2000, 'bottom-right');
				}
			});
		} else {
			this.sgs.request('put', 'type/updateType', { form: this.form.value }, async (res) => {
				if (res.success) {
					this.form.patchValue({
						id: '',
						type: '',
					});
					this.sgs.showToaster('success', 'Update Successfully...', 'Success', 2000, 'bottom-right');
				}
			});
		}
	}

	checkType() {
		this.sgs.request('get', 'type/checkType', null, async (res) => {
			if (res.success) {
				this.typeData = await res.data;
				this.loading = false;
			} else {
				this.typeData = [];
				this.loading = false;
			}
		});
	}

	edit(data) {
		this.form.patchValue({
			id: data.id,
			type: data.type,
		});
	}

	delete(i) {
		this.sgs
			.Modal(
				{
					header: `System Message`,
					content: `Are you sure you want to delete this Type ?`,
					type: 'confirmation',
					buttonName: 'close',
				},
				{ size: 'sm' }
			)
			.confirm.subscribe((response) => {
				if (response) {
					let a = _.pullAt(this.typeData, [i]);
					this.sgs.request('put', 'type/removeType', { id: a[0].id }, async (res) => {
						if (res.success) {
							this.sgs.showToaster('warning', 'Deleted successfully...', 'Warning', 2000, 'bottom-right');
						}
					});
				}
			});
	}
}
