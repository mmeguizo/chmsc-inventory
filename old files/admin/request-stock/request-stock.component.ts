import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRequestStockComponent } from '../modals/add-request-stock/add-request-stock.component';
import { async } from 'rxjs/internal/scheduler/async';
import { UpdateRequestStockComponent } from '../modals/update-request-stock/update-request-stock.component';
import { ApproveRequestComponent } from '../modals/approve-request/approve-request.component';
@Component({
	selector: 'ngx-request-stock',
	templateUrl: './request-stock.component.html',
	styleUrls: ['./request-stock.component.scss'],
})
export class RequestStockComponent implements OnInit {
	@Output() passEntry: EventEmitter<string> = new EventEmitter<string>();
	lengthOfreq: number;
	broken: number;

	constructor(public sgs: SharedGlobalService, public ngbModal: NgbModal) {}

	ngOnInit(): void {}

	lengthOfRequest(length: number) {
		console.log(length);

		this.lengthOfreq = length;
	}

	lengthOfBrokenRequest(length: number) {
		console.log(length);

		this.broken = length;
	}
}
