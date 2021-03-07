import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { async } from '@angular/core/testing';

@Component({
	selector: 'ngx-add-stock',
	templateUrl: './add-stock.component.html',
	styleUrls: ['./add-stock.component.scss'],
})
export class AddStockComponent implements OnInit {
	public form: any;
	public stock_id: number;
	duplicate: boolean;
	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService) {
		this.createForm();
	}

	ngOnInit() {}

	createForm() {
		this.form = this.formBuilder.group({
			id: [''],
			material: ['', [Validators.required]],
			stock: this.formBuilder.group({
				lot: [''],
				qty: ['', [Validators.required]],
				noteField: [''],
			}),
		});
	}

	closeModal() {
		this.activeModal.close();
	}

	selectMaterials() {
		this.sgs.request('get', 'truck_material/get_all_materials', null, async (res) => {
			if (res.success) {
				selector(res.data);
			} else {
				selector([]);
			}
		});
		let selector = (data) => {
			this.sgs
				.Modal(
					{
						header: `Select Material`,
						content: {
							type: 'array-object',
							data: data,
							display: [
								{ property: 'id', nicename: '#' },
								{ property: 'name', nicename: 'Name' },
								{ property: 'description', nicename: 'Description' },
								{ property: 'brand', nicename: 'Brand' },
							],
							return: ['id', 'name'],
							search: true,
							searchTo: ['id', 'name', 'description', 'brand'],
							sortTo: 'id',
						},
						accept: 'single',
						type: 'selector',
					},
					{ size: 'lg' }
				)
				.selected.subscribe((response) => {
					if (response) {
						this.form.patchValue({
							id: response.data[0],
							material: response.data[1],
						});
						this.stock_id = response.data[0]; //
					}
				});
		};
	}

	addStock() {
		this.sgs.request('post', 'stock/add_stock', { form: this.form.value }, async (res) => {
			if (res.success) {
				this.sgs.showToaster('success', 'Stock has been added.', 'Success', 2000, 'bottom-right');
				this.closeModal();
			}
		});
	}

	lotDuplicateChecker(event: any) {
		console.log(this.stock_id);
		console.log(event.target.value);

		this.stock_id &&
			event.target.value && [
				this.sgs.request('get', 'stock/checkDuplicate', { stock_id: this.stock_id, lot_number: event.target.value }, async (res) => {
					if (res.success) {
						this.sgs.showToaster('warning', 'Lot Duplicate.', 'Success', 2000, 'bottom-right');
						this.duplicate = true;
					} else {
						this.sgs.showToaster('success', 'No Duplicate lot.', 'Success', 2000, 'bottom-right');
						this.duplicate = false;
					}
				}),
			];
	}
}
