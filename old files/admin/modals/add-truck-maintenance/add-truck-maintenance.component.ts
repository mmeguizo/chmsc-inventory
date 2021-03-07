import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import { BrokenRequestComponent } from './broken-request/broken-request.component';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthService } from '../../../@core/services/auth.service';
import { ReverseDate } from '../../../@core/pipes/dataFilter';

@Component({
	selector: 'ngx-add-truck-maintenance',
	templateUrl: './add-truck-maintenance.component.html',
	styleUrls: ['./add-truck-maintenance.component.scss'],
})
export class AddTruckMaintenanceComponent implements OnInit {
	//from viewmaintenance modal
	truck;
	//time
	public time: any;
	public date = new Date();
	//loading set to true
	public loading = true;
	//store data for employee
	public data = [];
	//store data for material
	public materialData = [];
	//store data for status broken
	public brokenStatus: any[];
	//inspected,acknowledge and mechanic ngModel
	public acknowledge: any;
	public inspected: any;
	public mechanic: any;
	public temp: any = [];
	//store for driver position
	public driver = [];
	inspector: any[];
	public role = this.auth.getTokenData('role');
	public lockTimeAndDateInput: boolean;
	public globalTime: any;
	ampm: string;
	hours: number;

	constructor(public activeModal: NgbActiveModal, public modalService: NgbModal, public sgs: SharedGlobalService, public auth: AuthService, public rd: ReverseDate) {
		console.log('role', this.role);

		//if role is not admin lock the date and time otherwise make it editable
		this.role !== 'admin'
			? (() => {
					this.lockTimeAndDateInput = true;
					this.hours = this.date.getHours();
					var min = this.date.getMinutes();
					this.ampm = this.date.getHours() >= 12 ? 'pm' : 'am';
					var minutes = min < 10 ? '0' + min : min;
					this.hours = this.hours % 12;
					this.hours = this.hours ? this.hours : 12;
					this.globalTime = this.hours + ':' + minutes + ' ' + this.ampm;
					this.time = this.globalTime;
			  })()
			: [(this.date = new Date()), (this.time = new Date()), (this.lockTimeAndDateInput = false)];
	}

	ngOnInit(): void {
		this.getAllEmployee();
		console.log('this.truckinfor', this.truck);
	}

	closeModal() {
		this.activeModal.close();
	}

	getAllEmployee() {
		this.sgs.request('get', 'user/getAllUsers', {}, async (res) => {
			if (res.success) {
				this.loading = false;
				this.data = res.data;
				let inspector = this.data.filter((inspector) => inspector.designation == 'inspector');
				let driv = this.data.filter((driver) => driver.designation == 'driver');
				this.driver = driv;
				this.inspector = inspector;
			} else {
				this.loading = false;
				this.data = [];
			}
		});
	}

	add() {
		console.log(this.time);

		this.sgs.request(
			'post',
			'truck_maintenance/addMaintenance',
			{
				date: this.date,
				time: this.time,
				maintenance: this.temp,
				truckId: this.truck.id,
				mechanicNote: this.mechanic,
				inspectedBy: this.inspected,
				acknowledgeBy: this.acknowledge,
			},
			async (res) => {
				if (res.success) {
					this.brokenStatus = _.filter(this.temp, { itemStatus: 'broken' });
					if (this.brokenStatus.length > 0) {
						this.sgs
							.Modal(
								{
									header: 'System Message',
									content: `Create Request for ${this.brokenStatus.length} broken ${this.brokenStatus.length > 1 ? 'items?' : 'item?'}`,
									type: 'confirmation',
								},
								{ size: 'sm' }
							)
							.confirm.subscribe((con) => {
								if (con) {
									const activeModal = this.modalService.open(BrokenRequestComponent, { size: 'xl' });
									//can be put inside 1 object but only god knows what did i do
									activeModal.componentInstance.data = this.brokenStatus;
									activeModal.componentInstance.truckDetails = this.truck;
									activeModal.componentInstance.date = this.date;
									activeModal.componentInstance.time = this.time;
									activeModal.componentInstance.mechanicNote = this.mechanic;
									activeModal.componentInstance.inspectedBy = this.inspected;
									activeModal.componentInstance.acknowledgeBy = this.acknowledge;
									activeModal.result.then((data) => {
										data ? this.closeModal() : alert('Please contact your administrator!');
									});
								} else {
									this.closeModal();
								}
							});
					} else {
						this.sgs.Toaster('success', 'Success', 'Save successfuly...');
						this.closeModal();
					}
				} else {
					this.closeModal();
				}
			}
		);
	}

	addItem(event, data, id) {
		let indParticulars = {
			id: id,
			itemStatus: event.value,
			item: data.name !== undefined ? data.name : '',
			status: data.status !== undefined ? data.status : '',
			comment: data.comment !== undefined ? data.comment : '',
			mechanic: data.mechanic !== undefined ? data.mechanic : '',
		};
		let find = _.findIndex(this.temp, { id: id });
		if (find !== -1) {
			this.temp.splice(find, 1);
			this.temp.push(indParticulars);
		} else {
			this.temp.push(indParticulars);
		}
	}

	selectMaterials() {
		this.sgs.request('get', 'truck_material/get_all_materials', {}, async (res) => {
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
							],
							return: ['id', 'name'],
							search: true,
							searchTo: ['id', 'name'],
							sortTo: 'id',
						},
						accept: 'many',
						type: 'selector',
					},
					{ size: 'lg' }
				)
				.selected.subscribe(async (response) => {
					if (response) {
						response.data.map(async (e) => {
							e.status = '';
							e.comment = '';
							return await e;
						});
						this.materialData = await response.data;
					}
				});
		};
	}
}
