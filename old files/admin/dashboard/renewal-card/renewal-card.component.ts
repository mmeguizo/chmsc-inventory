import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { UpdateTruckFileComponent } from '../../modals/update-truck-file/update-truck-file.component';

@Component({
	selector: 'ngx-renewal-card',
	templateUrl: './renewal-card.component.html',
	styleUrls: ['./renewal-card.component.scss'],
})
export class RenewalCardComponent implements OnInit {
	@Input() data: any[];

	public filterQuery = '';
	public sortBy = 'id';
	public sortOrder = 'asc';
	public selectQueryString = 'Employee ID';
	public selectQuery = 'id';
	public now: any;
	public today = new Date();

	@ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
	@ViewChild('search', { static: false }) nameField: ElementRef;
	constructor(public sgs: SharedGlobalService) {}

	ngOnInit(): void {
		this.now = `${this.today.getFullYear()}${('0' + (this.today.getMonth() + 1).toString()).slice(-2)}${('0' + this.today.getDate()).slice(-2)}`;
	}

	selectFilter(name, value) {
		this.selectQuery = name;
		this.selectQueryString = value;
		this.popover.hide();
		setTimeout(() => this.nameField.nativeElement.focus(), 0);
		this.filterQuery = '';
	}

	renewals(data) {
		this.sgs.Modal({ data: data }, { component: UpdateTruckFileComponent, size: 'lg' });
	}
}
