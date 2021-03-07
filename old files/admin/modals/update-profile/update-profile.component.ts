import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { AuthService } from '../../../@core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPositionComponent } from '../../../admin/modals/new-position/new-position.component';

@Component({
	selector: 'ngx-update-profile',
	templateUrl: './update-profile.component.html',
	styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
	public loading = true;
	public form: any;
	public data: any;
	public uid: any;
	public dataID: any;
	public showpassword = false;
	public eyeIcon = 'fas fa-eye';
	public avatar: any;
	public role = this.sgs.auth.getTokenData('role');
	public myId = this.sgs.auth.getTokenData('id');
	allPosition: any;

	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService, public auth: AuthService, public ngbModal: NgbModal) {
		this.getAllPosition();
		this.createForm();
	}

	createForm() {
		this.form = this.formBuilder.group({
			role: ['', [Validators.required]],
			designation: ['', [Validators.required]],
			username: ['', [Validators.required]],
			lname: ['', [Validators.required]],
			fname: ['', [Validators.required]],
			mname: [''],
			password: [''],
		});
	}

	ngOnInit() {
		this.getAllPosition();
		this.getUser();
	}

	getUser() {
		this.sgs.request('get', 'user/getUserById', { id: this.uid }, async (response) => {
			if (response.success) {
				this.avatar = response.data.avatar;
				this.dataID = response.data._id;
				this.form = this.formBuilder.group({
					role: [response.data.role, [Validators.required]],
					designation: [response.data.designation, [Validators.required]],
					username: [response.data.username, [Validators.required]],
					lname: [response.data.lname, [Validators.required]],
					fname: [response.data.fname, [Validators.required]],
					mname: [response.data.mname],
					password: [''],
				});
				//	let x = this.form.controls['designation'].patchValue({ designation: response.data.designation, onlySelf: true });
			}
		});
	}

	updateUser(data) {
		data.value.uid = this.dataID;
		this.sgs.request('post', 'user/updateUser', { data: data.value, avatar: this.avatar }, async (response) => {
			if (response.success) {
				if (response.isPasswordChange == false) {
					//shared profile and employee update information if using profile to change password will cause to logout other if employee profile will just close the modal
					this.myId === this.uid
						? [this.sgs.showToaster('success', 'Your Data is Updated.', 'Success', 3000, 'bottom-right'), this.closeModal()]
						: [this.sgs.showToaster('success', 'Data is Updated.', 'Success', 3000, 'bottom-right'), this.closeModal()];
				} else {
					//shared profile and employee update information if using profile to change password will cause to logout other if employee profile will just close the modal
					this.myId === this.uid
						? [this.sgs.showToaster('success', 'Please login with your new password', 'Success', 3000, 'bottom-right'), this.auth.logout()]
						: [this.sgs.showToaster('success', 'Data is Updated', 'Success', 3000, 'bottom-right'), this.closeModal()];
					//	this.auth.logout();
				}
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

	imageLoader = false;
	elEventListenerActive: boolean;
	openFile(ev, id) {
		let file,
			el = document.getElementById(id);
		el.click();
		let handler = (fc) => {
			try {
				let fileList: any;
				let fd = new FormData();
				if (fc.target['files'][0]['name'] !== undefined) {
					fileList = fc.target;
					let file: File = fileList.files[0];
					fd.append('degree_attachment', file, file.name);
					this.sgs.submitting = true;
					this.sgs.request('post', 'xfile/avatars', fd, (response) => {
						if (response.success) {
							this.elEventListenerActive = false;
							this.avatar = response.data.name;
							el.removeEventListener('change', handler);
						} else {
							// this.Product.image = '';
							el.removeEventListener('change', handler);
						}
					});
				} else {
					// this.Product.image = '';
					ev.target.innerHTML = 'Browse';
					this.elEventListenerActive = false;
					el.removeEventListener('change', handler);
				}
			} catch (e) {
				// this.Product.image = '';
				ev.target.innerHTML = 'Browse';
				this.elEventListenerActive = false;
				el.removeEventListener('change', handler);
			}
		};
		if (!this.elEventListenerActive) {
			el.addEventListener('change', handler);
			this.elEventListenerActive = true;
		}
	}

	closeModal() {
		this.activeModal.close();
	}

	getAllPosition() {
		this.sgs.request('get', 'position/getAllPosition', {}, async (res) => {
			if (res.success) {
				this.allPosition = res.data;
				// console.log(this.allPosition);
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

	compareById(optionOne, optionTwo): boolean {
		return optionOne === optionTwo;
	}
}
