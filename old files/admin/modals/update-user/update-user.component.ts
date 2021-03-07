import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { AuthService } from '../../../@core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPositionComponent } from '../../../admin/modals/new-position/new-position.component';

@Component({
	selector: 'ngx-update-user',
	templateUrl: './update-user.component.html',
	styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
	loading = true;
	public form: any;
	data;
	uid;
	dataID;
	showpassword = false;
	eyeIcon = 'fas fa-eye';
	avatar;
	allPosition: any;

	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService, public auth: AuthService, public ngbModal: NgbModal) {
		this.getAllPosition();
		this.createForm();
	}

	createForm() {
		this.form = this.formBuilder.group({
			role: ['', [Validators.required]],
			username: ['', [Validators.required]],
			lname: ['', [Validators.required]],
			fname: ['', [Validators.required]],
			mname: [''],
			password: [''],
		});
	}

	ngOnInit() {
		this.getUser();
	}

	getUser() {
		this.sgs.request('get', 'user/getUserById', { id: this.uid }, async (response) => {
			if (response.success) {
				this.avatar = response.data.avatar;
				this.dataID = response.data._id;
				this.form = this.formBuilder.group({
					role: [response.data.role, [Validators.required]],
					username: [response.data.username, [Validators.required]],
					lname: [response.data.lname, [Validators.required]],
					fname: [response.data.fname, [Validators.required]],
					mname: [response.data.mname],
					password: [''],
				});
			}
		});
	}

	updateUser(data) {
		data.value.uid = this.dataID;
		this.sgs.request('post', 'user/updateUser', { data: data.value, avatar: this.avatar }, async (response) => {
			if (response.success) {
				this.sgs.showToaster('success', 'You have successfully updated the user information.', 'Success', 2000, 'bottom-right');
				this.closeModal();
			}
		});
	}

	showPassword() {
		if (this.showpassword == true) {
			this.showpassword = false;
			this.eyeIcon = 'fas fa-eye';
		} else {
			this.showpassword = true;
			this.eyeIcon = 'fas fa-eye-slash';
		}
	}

	closeModal() {
		this.activeModal.close();
	}

	getAllPosition() {
		this.sgs.request('get', 'position/getAllPosition', {}, async (res) => {
			if (res.success) {
				this.allPosition = res.data;
				console.log(this.allPosition);
			}
		});
	}

	getPosition(value) {
		if (value == 'AddNewType') {
			const activeModal = this.ngbModal.open(NewPositionComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
			activeModal.componentInstance.passEntry.subscribe((receivedEntry) => {
				this.getAllPosition();
			});
		}
	}
}
