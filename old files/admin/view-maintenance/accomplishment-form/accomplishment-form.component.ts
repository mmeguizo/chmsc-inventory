import { Component, OnInit, Input } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { async } from 'rxjs/internal/scheduler/async';
import * as moment from 'moment';

@Component({
	selector: 'ngx-accomplishment-form',
	templateUrl: './accomplishment-form.component.html',
	styleUrls: ['./accomplishment-form.component.scss'],
})
export class AccomplishmentFormComponent implements OnInit {
	@Input() data: any;
	date;
	plate;
	vrrf;
	km;
	hourReading;
	mech1;
	mech2;
	mech3;
	mech4;
	accomplishedBy;
	reviewedBy;
	approvedBy;

	truckmodel: string;
	trucktype: string;
	model = ['BEIBEN', 'FORLAND', 'DAYUN', 'ISUZU', 'SINOTRUCK'];
	type = ['10W', '8W', '6W', '4W', 'TRAILER'];
	workDetails = [
		{ name: 'ENGINE', details: '' },
		{ name: 'COOLING SYSTEM / RADIATOR', details: '' },
		{ name: 'TRANSMISSION', details: '' },
		{ name: 'INJECTION PUMP', details: '' },
		{ name: 'FUEL SUPPLY', details: '' },
		{ name: 'CLUTCH', details: '' },
		{ name: 'AIR PRESSURE', details: '' },
		{ name: 'AIR BREAKS', details: '' },
		{ name: 'MASTER / HYDROVAC', details: '' },
		{ name: 'BATTERY', details: '' },
		{ name: 'ELECTRICAL', details: '' },
		{ name: 'HEAD LIGHTS', details: '' },
		{ name: 'SIGNAL LIGHTS', details: '' },
		{ name: 'CLEARANCE LIGHTS', details: '' },
		{ name: 'STOP LIGHT', details: '' },
		{ name: 'CABIN LIGHTS', details: '' },

		{ name: 'BACK UP HORN', details: '' },
		{ name: 'HORN', details: '' },
		{ name: 'FOG LAMPS', details: '' },
		{ name: 'STARTER', details: '' },
		{ name: 'ALTERNATOR', details: '' },
		{ name: 'VOLTAGE REGULATOR', details: '' },
		{ name: 'WIPER', details: '' },
		{ name: 'WATER SEPERATOR', details: '' },
		{ name: 'AIRCON', details: '' },
		{ name: 'DASHBOARD', details: '' },
		{ name: 'SIDE MIRRORS', details: '' },
		{ name: 'UNDERCHASSIS', details: '' },

		{ name: 'I BEAM', details: '' },
		{ name: 'TIE ROD END', details: '' },
		{ name: 'STARTER', details: '' },
		{ name: 'DRAGLINK', details: '' },
		{ name: 'SHOCK ABSORBER', details: '' },
		{ name: 'LEFT SPRINGS', details: '' },
		{ name: 'AIR BAG', details: '' },
		{ name: 'AIRCON', details: '' },
		{ name: 'FUEL TANK', details: '' },
		{ name: 'AIR TANK', details: '' },
		{ name: 'TRAILER', details: '' },
	];

	constructor(public sgs: SharedGlobalService) {}

	ngOnInit(): void {
		this.findFormById();
	}
	findFormById() {
		this.sgs.request('get', 'truck/findFormById', { id: this.data }, async (res) => {
			if (res.success) {
				if (res.data[0].accomplishmentReport !== undefined) {
					this.workDetails = res.data[0].accomplishmentReport.workDetails.length !== 0 ? res.data[0].accomplishmentReport.workDetails : this.workDetails;
					this.date = res.data[0].accomplishmentReport.date !== undefined ? moment(res.data[0].accomplishmentReport.date).format('MM/DD/YY') : '';
					this.plate = res.data[0].accomplishmentReport.plate !== undefined ? res.data[0].accomplishmentReport.plate : '';
					this.vrrf = res.data[0].accomplishmentReport.vrrf !== undefined ? res.data[0].accomplishmentReport.vrrf : '';
					this.km = res.data[0].accomplishmentReport.km !== undefined ? res.data[0].accomplishmentReport.km : '';
					this.hourReading = res.data[0].accomplishmentReport.hourReading !== undefined ? res.data[0].accomplishmentReport.hourReading : '';
					this.truckmodel = res.data[0].accomplishmentReport.truckmodel !== undefined ? res.data[0].accomplishmentReport.truckmodel : '';
					this.trucktype = res.data[0].accomplishmentReport.trucktype !== undefined ? res.data[0].accomplishmentReport.trucktype : '';
					this.mech1 = res.data[0].accomplishmentReport.mech1 !== undefined ? res.data[0].accomplishmentReport.mech1 : '';
					this.mech2 = res.data[0].accomplishmentReport.mech2 !== undefined ? res.data[0].accomplishmentReport.mech2 : '';
					this.mech3 = res.data[0].accomplishmentReport.mech3 !== undefined ? res.data[0].accomplishmentReport.mech3 : '';
					this.mech4 = res.data[0].accomplishmentReport.mech4 !== undefined ? res.data[0].accomplishmentReport.mech4 : '';
					this.accomplishedBy = res.data[0].accomplishmentReport.accomplishedBy !== undefined ? res.data[0].accomplishmentReport.accomplishedBy : '';
					this.reviewedBy = res.data[0].accomplishmentReport.reviewedBy !== undefined ? res.data[0].accomplishmentReport.reviewedBy : '';
					this.approvedBy = res.data[0].accomplishmentReport.approvedBy !== undefined ? res.data[0].accomplishmentReport.approvedBy : '';
				} else {
					console.log('check accomplished componet line 105');
				}
			}
		});
	}
	save() {
		let form = {
			id: this.data,
			truckmodel: this.truckmodel,
			trucktype: this.trucktype,
			date: this.date,
			vrrf: this.vrrf,
			km: this.km,
			plate: this.plate,
			hourReading: this.hourReading,
			workDetails: this.workDetails,
			mech1: this.mech1,
			mech2: this.mech2,
			mech3: this.mech3,
			mech4: this.mech4,
			accomplishedBy: this.accomplishedBy,
			reviewedBy: this.reviewedBy,
			approvedBy: this.approvedBy,
		};
		this.sgs.request('put', 'truck/addAccomplishmentForm', { form }, async (res) => {
			if (res.success) {
				this.sgs.showToaster('success', 'Save successfully...', 'Success', 2000, 'bottom-right');
			} else {
				console.log('pls check line 136');
			}
		});
	}
}
