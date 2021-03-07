import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import * as moment from 'moment';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
	selector: 'ngx-approve-request',
	templateUrl: './approve-request.component.html',
	styleUrls: ['./approve-request.component.scss'],
})
export class ApproveRequestComponent implements OnInit {
	id;
	public socketInstance;

	public data = [];
	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService) {
		this.socketInstance = sgs.ResponseSocket('confirm_request').subscribe((emitted) => {
			this.get_request_by_id();
		});
	}

	ngOnInit(): void {
		this.get_request_by_id();
	}
	closeModal() {
		this.activeModal.close();
	}

	get_request_by_id() {
		this.sgs.request('get', 'request/get_request_by_id', { id: this.id }, async (res) => {
			if (res.success) {
				this.data = res.data[0].request;
			} else {
				this.data = [];
			}
		});
	}

	confirm(data) {
		let _id = data._id;
		let name = data.material_name;
		let qty = data.qty;

		this.sgs.request('get', 'stock/get_stock_by_id', { id: data.rid }, async (res) => {
			if (res.success) {
				selector(res.data[0].stocks);
			} else {
				selector([]);
			}
		});

		let selector = (data) => {
			this.sgs
				.Modal(
					{
						header: `Select Stocks`,
						content: {
							type: 'array-object',
							data: data,
							display: [
								{ property: 'material_name', nicename: 'Material Name' },
								{ property: 'qty', nicename: 'Qty' },
								{ property: 'date', nicename: 'Date' },
							],
							return: ['_id', 'qty'],
							search: true,
							searchTo: ['material_name', 'qty', 'date'],
							sortTo: 'qty',
						},
						accept: 'single',
						type: 'selector',
					},
					{ size: 'lg' }
				)
				.selected.subscribe((response) => {
					if (response.data[1] < qty) {
						this.sgs.showToaster('info', 'Stocks is Low', 'Request is Greater than stock', 4000, 'top-rigt');
					} else {
						this.sgs.request('post', 'stock/get_stocks', { _id: response.data[0], stocks_get: qty, name: name }, async (res) => {
							if (res) {
								this.sgs.request('put', 'request/confirm_request', { request_Id: _id, id: this.id }, async (res) => {
									if (res.data == 'confirm') {
										this.sgs.showToaster('success', 'Request has been approved.', 'Success', 2000, 'bottom-right');
										this.closeModal();
									} else {
										this.sgs.showToaster('success', 'Request has been approved.', 'Success', 2000, 'bottom-right');
									}
								});
							}
						});
					}
				});
		};
	}
}
