import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeesComponent } from '../modals/add-employees/add-employees.component';
import { UpdateEmployeeComponent } from '../modals/update-employee/update-employee.component';
import { async } from 'rxjs/internal/scheduler/async';
import { AddUserComponent } from '../modals/add-user/add-user.component';
import { UpdateProfileComponent } from '../modals/update-profile/update-profile.component';

@Component({
	selector: 'ngx-employees',
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
	public data = [];
	public filterQuery = '';
	public sortBy = 'id';
	public sortOrder = 'asc';
	public selectQueryString = 'Employee ID';
	public selectQuery = 'id';

	public socketInstance;
	public socketInstance1;
	public loading = true;
	public positions: any;

	@ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
	@ViewChild('search', { static: false }) nameField: ElementRef;
	allPosition: any;

	constructor(public sgs: SharedGlobalService, public ngbModal: NgbModal) {
		this.socketInstance = sgs.ResponseSocket('users').subscribe((emitted) => {
			this.getAllEmployee();
		});
		this.socketInstance1 = sgs.ResponseSocket('employee').subscribe((emitted) => {
			this.getAllEmployee();
		});
	}

	ngOnInit(): void {
		this.getAllEmployee();
	}

	getAllEmployee() {
		this.sgs.request(
			'get',
			'user/getAllUsers',
			null,
			async (res) => {
				if (res.success) {
					this.data = res.data;
					this.loading = false;
					console.log(this.data);
				} else {
					console.log(res);
				}
			},
			{ cache: true, describe: 'Error getting users!' }
		);
	}

	updateUser(id) {
		const activeModal = this.ngbModal.open(UpdateProfileComponent, {
			size: 'lg',
			container: 'nb-layout',
			windowClass: 'min_height',
		});
		activeModal.componentInstance.uid = id;
	}

	selectFilter(name, value) {
		this.selectQuery = name;
		this.selectQueryString = value;
		this.popover.hide();
		setTimeout(() => this.nameField.nativeElement.focus(), 0);
		this.filterQuery = '';
	}
	addEmployee(id) {
		// this.sgs.Modal(
		//   {},
		//   {component : AddEmployeesComponent, size : 'xl'}
		// )
		const activeModal = this.ngbModal.open(AddEmployeesComponent, {
			size: 'xl',
			container: 'nb-layout',
			windowClass: 'min_height',
		});
		activeModal.componentInstance.id = id;
	}

	delete(id) {
		this.sgs
			.Modal(
				{
					header: `System Message`,
					content: `Are you sure you want to delete this employee ?`,
					type: 'confirmation',
					buttonName: 'close',
				},
				{ size: 'sm' }
			)
			.confirm.subscribe((response) => {
				if (response) {
					this.sgs.request('put', 'employee/deleteEmployee', { id: id }, async (res) => {
						if (res.success) {
							this.sgs.showToaster('success', 'Position successfully deleted.', 'Success', 2000, 'bottom-right');
						}
					});
				}
			});
	}
	update(data) {
		this.sgs.request('get', 'employee/getEmpById', { id: data }, async (res) => {
			if (res.success) {
				this.sgs.Modal({ data: res.data[0] }, { component: UpdateEmployeeComponent, size: 'xl' });
			}
		});
	}

	addUser() {
		const activeModal = this.ngbModal.open(AddUserComponent, {
			size: 'lg',
			container: 'nb-layout',
			windowClass: 'min_height',
		});
	}

	ngOnDestroy() {
		this.socketInstance.unsubscribe();
		this.socketInstance1.unsubscribe();
	}
}
