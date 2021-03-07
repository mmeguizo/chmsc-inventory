import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddStockComponent } from '../modals/add-stock/add-stock.component';
import { async } from '@angular/core/testing';
import { UpdateStockComponent } from '../modals/update-stock/update-stock.component';

@Component({
	selector: 'ngx-stock-materials',
	templateUrl: './stock-materials.component.html',
	styleUrls: ['./stock-materials.component.scss'],
})
export class StockMaterialsComponent implements OnInit {
	public data = [];
	public filterQuery = '';
	public sortBy = 'id';
	public sortOrder = 'asc';
	public selectQueryString = 'Stock  ID';
	public selectQuery = 'id';
	public socketInstance;
	public socketInstance1;
	public socketInstance2;
	public socketInstance3;
	public loading = true;
	@ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
	@ViewChild('search', { static: false }) nameField: ElementRef;

	constructor(public sgs: SharedGlobalService, public ngbModal: NgbModal) {
		this.socketInstance = sgs.ResponseSocket('add_stock').subscribe((emitted) => {
			this.get_all_stocks();
		});
		this.socketInstance1 = sgs.ResponseSocket('delete_stock').subscribe((emitted) => {
			this.get_all_stocks();
		});
		this.socketInstance3 = sgs.ResponseSocket('delete_selected_stock').subscribe((emitted) => {
			this.get_all_stocks();
		});
		this.socketInstance2 = sgs.ResponseSocket('update_selected_stock').subscribe((emitted) => {
			this.get_all_stocks();
		});
	}

	ngOnInit() {
		this.get_all_stocks();
	}
	get_all_stocks() {
		this.sgs.request('get', 'stock/get_all_stocks', null, async (res) => {
			if (res.success) {
				this.data = res.data;
				this.loading = false;
			} else {
				this.loading = false;
				this.data = [];
			}
		});
	}

	selectFilter(name, value) {
		this.selectQuery = name;
		this.selectQueryString = value;
		this.popover.hide();
		setTimeout(() => this.nameField.nativeElement.focus(), 0);
		this.filterQuery = '';
	}

	addStocks() {
		this.sgs.Modal({}, { component: AddStockComponent, size: 'lg' });
	}

	delete(id) {
		this.sgs
			.Modal(
				{
					header: `System Message`,
					content: `Are you sure you want to delete this Stocks ?`,
					type: 'confirmation',
					buttonName: 'close',
				},
				{ size: 'sm' }
			)
			.confirm.subscribe((response) => {
				if (response) {
					this.sgs.request('put', 'stock/delete_stock', { id: id }, async (res) => {
						if (res.success) {
							this.sgs.showToaster('success', 'Stocks successfully deleted.', 'Success', 2000, 'bottom-right');
						}
					});
				}
			});
	}
	update(data) {
		this.sgs.Modal({ id: data.id, materialName: data.material_name }, { component: UpdateStockComponent, size: 'xl' });
	}

	ngOnDestroy(): void {
		this.socketInstance1.unsubscribe();
		this.socketInstance.unsubscribe();
		this.socketInstance2.unsubscribe();
		this.socketInstance3.unsubscribe();
	}
}
