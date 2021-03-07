import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators } from '@angular/forms';
import { EditPositionComponent } from '../edit-position/edit-position.component';
@Component({
	selector: 'ngx-position',
	templateUrl: './new-position.component.html',
	styleUrls: ['./new-position.component.scss'],
})
export class NewPositionComponent implements OnInit {
	@Output() passEntry: EventEmitter<string> = new EventEmitter<string>();

	public socketInstance;
	public form: any;
	public data = [];

	filterQuery = '';
	sortBy = 'id';
	sortOrder = 'desc';
	selectQueryString = 'ID';
	selectQuery = 'id';

	constructor(public activeModal: NgbActiveModal, public sgs: SharedGlobalService, public formBuilder: FormBuilder, public ngbModal: NgbModal) {
		this.createForm();

		this.socketInstance = sgs.ResponseSocket('types').subscribe((emitted) => {
			this.getAllPosition();
		});
	}

	createForm() {
		this.form = this.formBuilder.group({
			position: ['', [Validators.required]],
		});
	}

	ngOnInit() {
		this.getAllPosition();
	}

	ngOnDestroy() {
		this.socketInstance.unsubscribe();
	}

	addType(data) {
		this.sgs.request('post', 'position/addPosition', { form: this.form.value }, async (res) => {
			if (res.success) {
				this.passEntry.emit(res.data);
				this.closeModal();
				this.sgs.showToaster('success', 'New Position has been added!', 'Success', 3000, 'bottom-right');
			}
		});
	}

	getAllPosition() {
		this.sgs.request('get', 'position/getAllPosition', {}, async (res) => {
			if (res.success) {
				this.data = res.data;
				console.log(this.data);
			}
		});
	}

	closeModal() {
		this.activeModal.close();
	}

	update(datas) {
		const activeModal = this.ngbModal.open(EditPositionComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
		activeModal.componentInstance.data = datas;
		activeModal.componentInstance.passEntry.subscribe((receivedEntry) => {
			//this.types.push(receivedEntry);
			this.getAllPosition();
		});
	}

	deleteType(data) {
		this.sgs
			.Modal(
				{
					header: `Are you sure you want to delete this ${data.type} ?`,
					content: `Deleting Type with the id ${data.id}`,
					type: 'confirmation',
				},
				{ size: 'sm' }
			)
			.confirm.subscribe((response) => {
				if (response) {
					this.sgs.request('put', 'position/deletePosition', { id: data.id }, async (res) => {
						if (res.success) {
							this.sgs.showToaster('success', 'Position Successfully Deleted', 'Success', 3000, 'bottom-right');
							this.getAllPosition();
						} else {
							this.sgs.showToaster('warning', 'Unable to Delete Position', 'Oops', 3000, 'bottom-right');
						}
					});
				}
			});
	}
}
