import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import * as _ from 'lodash';

import { async } from '@angular/core/testing';
@Component({
	selector: 'ngx-add-new-categories',
	templateUrl: './add-new-categories.component.html',
	styleUrls: ['./add-new-categories.component.scss'],
})
export class AddNewCategoriesComponent implements OnInit {
	public form: any;
	categoryData = [];
	loading = true;
	public socketInstance;

	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService) {
		this.createForm();
		this.socketInstance = sgs.ResponseSocket('addCategory').subscribe((emitted) => {
			if (emitted) {
				this.categoryData.push(emitted.data.data);
			}
		});
		this.socketInstance = sgs.ResponseSocket('update').subscribe((emitted) => {
			if (emitted) {
				const update = _.findIndex(this.categoryData, { id: emitted.data.id });
				this.categoryData.splice(update, 1, emitted.data);
			}
		});
	}

	ngOnInit(): void {
		this.checkCategory();
	}

	createForm() {
		this.form = this.formBuilder.group({
			id: [''],
			categories: ['', [Validators.required]],
		});
	}

	closeModal() {
		this.activeModal.close();
	}

	save() {
		if (this.form.value.id === '') {
			this.sgs.request('post', 'category/addNewCategory', { form: this.form.value }, async (res) => {
				if (res.success) {
					this.form.patchValue({
						id: '',
						categories: '',
					});
					this.sgs.showToaster('success', 'Category added successfully...', 'Success', 2000, 'bottom-right');
				}
			});
		} else {
			this.sgs.request('put', 'category/updateCategory', { form: this.form.value }, async (res) => {
				if (res.success) {
					this.form.patchValue({
						id: '',
						categories: '',
					});
					this.sgs.showToaster('success', 'Update Successfully...', 'Success', 2000, 'bottom-right');
				}
			});
		}
	}

	checkCategory() {
		this.sgs.request('get', 'category/checkCategory', null, async (res) => {
			if (res.success) {
				this.categoryData = await res.data;
				this.loading = false;
			} else {
				this.categoryData = [];
				this.loading = false;
			}
		});
	}

	edit(data) {
		this.form.patchValue({
			id: data.id,
			categories: data.categories,
		});
	}

	delete(i) {
		this.sgs
			.Modal(
				{
					header: `System Message`,
					content: `Are you sure you want to delete this category ?`,
					type: 'confirmation',
					buttonName: 'close',
				},
				{ size: 'sm' }
			)
			.confirm.subscribe((response) => {
				if (response) {
					let a = _.pullAt(this.categoryData, [i]);
					this.sgs.request('put', 'category/removeCategory', { id: a[0].id }, async (res) => {
						if (res.success) {
							this.sgs.showToaster('warning', 'Deleted successfully...', 'Warning', 2000, 'bottom-right');
						}
					});
				}
			});
	}
}
