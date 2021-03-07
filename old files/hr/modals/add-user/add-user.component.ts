import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { NewPositionComponent } from '../new-position/new-position.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngx-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
	public loading = true;
	public form: any;
	public data;
	public showpassword = false;
	public eyeIcon = 'fas fa-eye';
	allPosition: any;
	public socketInstance;
	public socketInstance1;
	public socketInstance2;
	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService, public ngbModal: NgbModal) {
		this.createForm();

		this.socketInstance = sgs.ResponseSocket('position').subscribe((emitted) => {
			this.getAllPosition();
		});
		this.socketInstance1 = sgs.ResponseSocket('deleteposition').subscribe((emitted) => {
			this.getAllPosition();
		});
		this.socketInstance2 = sgs.ResponseSocket('updatePosition').subscribe((emitted) => {
			this.getAllPosition();
		});
	}

	createForm() {
		this.form = this.formBuilder.group({
			role: ['', [Validators.required]],
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
			lname: ['', [Validators.required]],
			fname: ['', [Validators.required]],
			mname: [''],
		});
	}

	ngOnInit() {
		this.getAllPosition();
	}

	addUser(data) {
		this.sgs.request('post', 'user/createUser', data.value, async (response) => {
			if (response.success) {
				this.sgs.showToaster('success', 'New user has been added', 'Success', 2000, 'bottom-right');
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
				console.log('getAllPosition');
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

	ngOnDestroy() {
		this.socketInstance.unsubscribe();
		this.socketInstance1.unsubscribe();
		this.socketInstance2.unsubscribe();
	}
}
