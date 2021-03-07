import { Component, OnInit, Input } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import * as moment from 'moment';

@Component({
	selector: 'ngx-truck-checklist',
	templateUrl: './truck-checklist.component.html',
	styleUrls: ['./truck-checklist.component.scss'],
})
export class TruckChecklistComponent implements OnInit {
	@Input() data: any;
	date;
	inspectedBy;
	truckmodel: string;
	trucktype: string;
	model = ['BEIBEN', 'FORLAND', 'DAYUN', 'ISUZU', 'SINOTRUCK'];
	type = ['10W', '8W', '6W', '4W', 'TRAILER'];
	report = [];

	constructor(public sgs: SharedGlobalService) {}

	ngOnInit(): void {
		this.findByid();
		this.Tchecklist();
	}
	check(event, index) {
		if (event.checked) {
			const report = this.report[index];
			report.ok = true;
		} else {
			const report = this.report[index];
			report.ok = false;
		}
	}

	Tchecklist() {
		this.report = [
			{ name: 'EXTERIOR COWL', reason: '', ok: false },
			{ name: 'PANEL BOARD', reason: '', ok: false },
			{ name: 'DASHBOARD', reason: '', ok: false },
			{ name: 'STEREO', reason: '', ok: false },
			{ name: 'FRONT WINDSHIELD', reason: '', ok: false },
			{ name: 'BACK WINDSHIELD', reason: '', ok: false },
			{ name: 'FRONT BUMPER', reason: '', ok: false },
			{ name: 'RIGHT DOOR', reason: '', ok: false },
			{ name: 'LEFT DOOR', reason: '', ok: false },
			{ name: 'RIGHT HEADLIGHT', reason: '', ok: false },
			{ name: 'LEFT HEADLIGHT', reason: '', ok: false },
			{ name: 'FRONT RIGHT SIGNAL LIGHT', reason: '', ok: false },
			{ name: 'FRONT LEFT SIGNAL LIGHT', reason: '', ok: false },
			{ name: 'RIGHT FENDER SIGNAL LIGHT', reason: '', ok: false },
			{ name: 'LEFT FENDER SIGNAL LIGHT', reason: '', ok: false },
			{ name: 'COWL CLEARANCE LIGHT', reason: '', ok: false },
			{ name: 'CABIN LIGHT', reason: '', ok: false },
			{ name: 'AIRCON', reason: '', ok: false },
			{ name: 'HORN', reason: '', ok: false },
			{ name: 'LEFT SIDE MIRROR', reason: '', ok: false },
			{ name: 'RIGHT SIDE MIRROR', reason: '', ok: false },
			{ name: 'WIPER', reason: '', ok: false },
			{ name: 'STOP LIGHT', reason: '', ok: false },
			{ name: 'BACK UP LIGHT', reason: '', ok: false },
			{ name: 'REAR SIGNAL LIGHT', reason: '', ok: false },
			{ name: 'BACK UP HORN', reason: '', ok: false },
			{ name: 'MUD GUARD', reason: '', ok: false },
			{ name: 'FUEL TANK', reason: '', ok: false },
			{ name: 'AIR TANK', reason: '', ok: false },
			{ name: 'SPARE TIRE', reason: '', ok: false },
			{ name: 'TIRES', reason: '', ok: false },
			{ name: 'KEY', reason: '', ok: false },
			{ name: 'JACK /TIRE WRENCH / TOOLS', reason: '', ok: false },
			{ name: 'STEERING', reason: '', ok: false },
			{ name: 'ENGINE', reason: '', ok: false },
			{ name: 'TRANSMISSION / CLUTCH', reason: '', ok: false },
			{ name: 'BRAKES / MAXI BRAKE', reason: '', ok: false },
		];
	}

	save() {
		let checklist = {
			id: this.data,
			date: this.date,
			truckmodel: this.truckmodel,
			trucktype: this.trucktype,
			report: this.report,
			inspectedBy: this.inspectedBy,
		};
		this.sgs.request('put', 'truck/addTruckChecklist', { checklist: checklist }, async (res) => {
			if (res.success) {
				this.sgs.showToaster('success', 'Save successfully...', 'Success', 2000, 'bottom-right');
			} else {
				console.log('line 91');
			}
		});
	}

	findByid() {
		this.sgs.request('get', 'truck/getChecklistById', { id: this.data }, async (res) => {
			if (res.success) {
				if (res.data[0].checklist !== undefined) {
					this.date = res.data[0].checklist.date !== undefined ? moment(res.data[0].checklist.date).format('MM/DD/YY') : '';
					this.truckmodel = res.data[0].checklist.truckmodel !== undefined ? res.data[0].checklist.truckmodel : '';
					this.trucktype = res.data[0].checklist.trucktype !== undefined ? res.data[0].checklist.trucktype : '';
					this.report = res.data[0].checklist.report.length !== 0 ? res.data[0].checklist.report : this.report;
					this.inspectedBy = res.data[0].checklist.inspectedBy !== undefined ? res.data[0].checklist.inspectedBy : '';
				}
			}
		});
	}
}
