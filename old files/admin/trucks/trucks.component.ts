import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddVehicleComponent } from '../modals/add-vehicle/add-vehicle.component';
import { UpdateTruckFileComponent } from '../modals/update-truck-file/update-truck-file.component';
import { AddNewCategoriesComponent } from '../modals/add-new-categories/add-new-categories.component';
import * as _ from 'lodash';
import { async } from 'rxjs/internal/scheduler/async';
import { AddTruckTypeComponent } from '../modals/add-truck-type/add-truck-type.component';

@Component({
	selector: 'ngx-trucks',
	templateUrl: './trucks.component.html',
	styleUrls: ['./trucks.component.scss'],
})
export class TrucksComponent implements OnInit {
	public data = [];
	public selected = [];
	public filterQuery = '';
	public sortBy = 'id';
	public sortOrder = 'asc';
	public selectQueryString = 'Truck ID';
	public selectQuery = 'id';
	hasSelected;
	// isSearch = false;

	public socketInstance;
	public socketInstance1;
	public socketInstance2;
	public loading = true;
	@ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
	@ViewChild('search', { static: false }) nameField: ElementRef;

	constructor(public sgs: SharedGlobalService, public ngbModal: NgbModal) {
		this.socketInstance = sgs.ResponseSocket('newVehicle').subscribe((emitted) => {
			this.getAllVehicles();
		});
		this.socketInstance1 = sgs.ResponseSocket('deleteTruck').subscribe((emitted) => {
			this.getAllVehicles();
		});
		this.socketInstance2 = sgs.ResponseSocket('multipleDelete').subscribe((emitted) => {
			this.getAllVehicles();
		});
	}

	ngOnInit(): void {
		this.getAllVehicles();
	}

	getAllVehicles() {
		this.sgs.request('get', 'truck/getAllVehicles', {}, async (res) => {
			if (res.success && res.data.length > 0) {
				console.log(res.data);
				res.data.map(async (e) => {
					e.selected = false;
				});
				this.loading = false;
				this.data = res.data;
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
	addVehicle() {
		this.sgs.Modal({}, { component: AddVehicleComponent, size: 'lg' });
	}
	viewTrim(data) {
		this.sgs.Modal(
			{
				data: data,
			},
			{ component: UpdateTruckFileComponent, size: 'lg' }
		);
	}
	viewMaintenance(data) {
		//	this.sgs.gothere('admin/view-maintenance', data);
		// this.sgs.Modal(
		// 	{
		// 		truckInfo: data,
		// 	},
		// 	{ component: ViewMaintenanceComponent, size: 'xl' }
		// );
	}

	deleteTruck(id) {
		this.sgs
			.Modal(
				{
					header: `System Message`,
					content: `Are you sure you want to delete this truck ?`,
					type: 'confirmation',
					buttonName: 'close',
				},
				{ size: 'sm' }
			)
			.confirm.subscribe((response) => {
				if (response) {
					this.sgs.request('put', 'truck/deleteTruck', { id: id }, async (res) => {
						if (res.success) {
							this.sgs.showToaster('success', 'Truck successfully deleted.', 'Success', 2000, 'bottom-right');
						}
					});
				}
			});
	}

	addCategories() {
		this.sgs.Modal({}, { component: AddNewCategoriesComponent, size: 'sm' });
	}
	addTruckType() {
		this.sgs.Modal({}, { component: AddTruckTypeComponent, size: 'sm' });
	}

	choose(data, def) {
		if (!data.selected) {
			data.selected = true;
			this.hasSelected = true;
			if (data.selected) {
				this.selected.push(data.id);
			}
		} else {
			data.selected = false;
			if (!data.selected) {
				let index = _.indexOf(this.selected, data.id);
				if (index != -1) {
					this.selected.splice(index, 1);
				}
				if (this.selected.length < 1) {
					this.hasSelected = false;
				}
			}
		}
	}

	deleteAll() {
		const head = 'Delete all multiple data.';
		const content = 'Do you want to delete this ' + (this.selected.length <= 1 ? 'data ?' : 'datas ?');
		this.sgs.Modal({ header: head, content: content, type: 'confirmation' }, { size: 'sm' }).confirm.subscribe((res) => {
			if (res) {
				this.sgs.request('post', 'truck/deleteMultipleTrucks', { ids: this.selected }, async (response) => {
					if (response.success) {
						console.log(this.data.length);

						this.sgs.showToaster('success', (this.selected.length > 1 ? 'Trucks ' : 'Truck ') + 'has been deleted successfully...', 'Success', 2000, 'bottom-right');
						this.selected = [];
						this.hasSelected = false;
					}
				});
			}
		});
	}

	ngOnDestroy(): void {
		this.socketInstance1.unsubscribe();
		this.socketInstance2.unsubscribe();
		this.socketInstance.unsubscribe();
	}
}
