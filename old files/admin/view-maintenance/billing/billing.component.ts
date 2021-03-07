import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { async } from 'rxjs/internal/scheduler/async';
import * as moment from 'moment';
@Component({
	selector: 'ngx-billing',
	templateUrl: './billing.component.html',
	styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
	@Input() data: any;
	@ViewChild('item', { static: true }) accordion;
	//ngModels
	date;
	vrrf;
	pr;
	mech1;
	mech2;
	mech3;
	mech4;
	accomplished;
	reviewed;
	approved;
	truckmodel;
	trucktype;
	repair;
	pullAndInstall;

	//arrays
	scope = [];
	model = ['BEIBEN', 'FORLAND', 'DAYUN', 'ISUZU', 'SINOTRUCK'];
	type = ['10W', '8W', '6W', '4W', 'TRAILER'];
	tempRepair = ['REPAIR', 'CORRECT', 'OVERHAUL', 'ALIGN'];
	install = ['REPAIR', 'CORRECT', 'OVERHAUL', 'ALIGN'];

	constructor(public sgs: SharedGlobalService) {}

	ngOnInit(): void {
		this.findByid();
		this.scopeOfWork();
	}

	toggle() {
		this.accordion.toggle();
	}

	scopeOfWork() {
		this.scope = [
			{
				name: 'ENGINE',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'COOLING SYSTEM/RADIATOR',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'TRANSMISSION',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'ENJECTION PUMP',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'FUEL SUPPLY',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'CLUTCH',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'AIR PRESSURE',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'AIR BRAKES',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'MASTER/HYRDROVAC',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'BATTERY',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'ELECTRICAL',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'HEAD LIGHTS',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'SIGNAL LIGHTS',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'CLEARANCE LIGTHS',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'STOP LIGHT',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'CABIN LIGTHS',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'BACKUP HORN',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'HORN',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'FOG LAMPS',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'STARTER',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'ALTERNATOR',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'VOLTAGE REGULATOR',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'WIPER',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'WATER SEPARATOR',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'DASHBOARD',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'SIDE MIRRORS',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'UNDERCHASSIS',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'I BEAM',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'TIE ROD END',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'DRAG LINK',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'SHOCK ABSORBER',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'LIFT SPRINGS',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'AIR BAG',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'FUEL TANK',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'AIR TANK',
				scopeOfWork: '',
				amount: 0,
			},
			{
				name: 'TRAILER',
				scopeOfWork: '',
				amount: 0,
			},
		];
	}

	findByid() {
		this.sgs.request('get', 'truck/findById', { id: this.data }, async (res) => {
			if (res.success) {
				if (res.data[0].jobOrder !== undefined) {
					this.scope = res.data[0].jobOrder.truckParts.length !== 0 ? res.data[0].jobOrder.truckParts : this.scope;
					this.date = res.data[0].jobOrder.orderDate !== undefined ? moment(res.data[0].jobOrder.orderDate).format('MM/DD/YY') : '';
					this.vrrf = res.data[0].jobOrder.vrrfNumber !== undefined ? res.data[0].jobOrder.vrrfNumber : 0;
					this.pr = res.data[0].jobOrder.prNumber !== undefined ? res.data[0].jobOrder.prNumber : 0;
					this.repair = res.data[0].jobOrder.troubleShoot !== undefined ? res.data[0].jobOrder.troubleShoot : '';
					this.truckmodel = res.data[0].jobOrder.truckModel !== undefined ? res.data[0].jobOrder.truckModel : '';
					this.trucktype = res.data[0].jobOrder.truckType !== undefined ? res.data[0].jobOrder.truckType : '';
					this.pullAndInstall = res.data[0].jobOrder.install !== undefined ? res.data[0].jobOrder.install : '';
					this.mech1 = res.data[0].jobOrder.firstMechanic !== undefined ? res.data[0].jobOrder.firstMechanic : '';
					this.mech2 = res.data[0].jobOrder.secondMechanic !== undefined ? res.data[0].jobOrder.secondMechanic : '';
					this.mech3 = res.data[0].jobOrder.thirdMechanic !== undefined ? res.data[0].jobOrder.thirdMechanic : '';
					this.mech4 = res.data[0].jobOrder.fourthMechanic !== undefined ? res.data[0].jobOrder.fourthMechanic : '';
					this.accomplished = res.data[0].jobOrder.accomplishedBy !== undefined ? res.data[0].jobOrder.accomplishedBy : '';
					this.reviewed = res.data[0].jobOrder.reviewedBy !== undefined ? res.data[0].jobOrder.reviewedBy : '';
					this.approved = res.data[0].jobOrder.approvedBy !== undefined ? res.data[0].jobOrder.approvedBy : '';
				} else {
				}
			}
		});
	}

	save() {
		let order = {
			id: this.data,
			troubleShoot: this.repair,
			orderDate: this.date,
			vrrfNumber: this.vrrf,
			prNumber: this.pr,
			install: this.pullAndInstall,
			truckModel: this.truckmodel,
			truckType: this.trucktype,
			firstMechanic: this.mech1,
			secondMechanic: this.mech2,
			thirdMechanic: this.mech3,
			fourthMechanic: this.mech4,
			accomplishedBy: this.accomplished,
			reviewedBy: this.reviewed,
			approvedBy: this.approved,
			truckParts: this.scope,
		};
		this.sgs.request('put', 'truck/addNewOrderBilling', { order }, async (res) => {
			if (res.success) {
				this.sgs.showToaster('success', 'Save successfully...', 'Success', 2000, 'bottom-right');
			} else {
				console.log('billing component line 288 error');
			}
		});
	}
}
