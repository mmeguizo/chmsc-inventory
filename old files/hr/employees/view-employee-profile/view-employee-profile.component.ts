import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
	selector: 'ngx-view-employee-profile',
	templateUrl: './view-employee-profile.component.html',
	styleUrls: ['./view-employee-profile.component.scss'],
})
export class ViewEmployeeProfileComponent implements OnInit {
	loading = true;
	data;
	profile;
	employment;
	primaryContacts;
	educational;
	disableForm = false;

	constructor(public sgs: SharedGlobalService, public route: ActivatedRoute) {}

	ngOnInit() {
		this.getUser();
	}

	getUser() {
		this.sgs.request('get', 'user/getUserInfo', { id: this.route.snapshot.params['id'] }, async (res) => {
			if (res.success) {
				this.loading = false;
				this.data = res.data;
				this.sgs.request('get', 'employee/getEmployee', { uid: res.data.id }, async (res) => {
					if (res.success && res.data != null) {
						this.disableForm = false;
						this.profile = res.data;
						this.primaryContacts = res.data.emergency[0];
						this.profile.yearsInService = moment().diff(res.data.dateHired, 'years', false);
						this.profile.age = moment().diff(res.data.dateOfBirth, 'years', false);
						this.educational = res.data.educational;
						var emp = _.filter(res.data.employment, (result) => {
							return result.status == true;
						});
						this.employment = emp[0];
					} else {
						this.disableForm = true;
					}
				});
			}
		});
	}
}
