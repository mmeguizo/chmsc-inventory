import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { UpdateMaterialImageComponent } from '../update-material-image/update-material-image.component';
import { async } from '@angular/core/testing';
@Component({
	selector: 'ngx-update-material',
	templateUrl: './update-material.component.html',
	styleUrls: ['./update-material.component.scss'],
})
export class UpdateMaterialComponent implements OnInit {
	data;
	public form: any;
	public imageInfo: any;
	public imageLoader = false;
	public elEventListenerActive: boolean;
	public documents = [];
	public material_data = [];
	public socketInstance;

	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService) {
		this.socketInstance = this.sgs.ResponseSocket('updateImg').subscribe((emmitted) => {
			this.get_material_id();
		});
		this.socketInstance = this.sgs.ResponseSocket('imgDelete').subscribe((emmitted) => {
			this.get_material_id();
		});
		this.socketInstance = this.sgs.ResponseSocket('addImgUpdate').subscribe((emmitted) => {
			this.get_material_id();
		});
	}

	ngOnInit() {
		this.get_material_id();
		this.createForm();
	}
	createForm() {
		this.form = this.formBuilder.group({
			name: [this.data.name, [Validators.required]],
			description: [this.data.description, [Validators.required]],
			brand: [this.data.brand, [Validators.required]],
		});
	}

	closeModal() {
		this.activeModal.close();
	}
	update(form) {
		this.sgs.request('put', 'truck_material/updateMaterials', { form: form.value, id: this.data.id, files: this.documents }, async (res) => {
			if (res.success) {
				this.sgs.showToaster('success', 'Material successfully updated.', 'Success', 2000, 'bottom-right');
				this.closeModal();
			} else {
				this.sgs.showToaster('success', 'Material successfully updated.', 'Success', 2000, 'bottom-right');
				this.closeModal();
			}
		});
	}

	get_material_id() {
		this.sgs.request('get', 'truck_material/get_material_id', { data: this.data.id }, async (res) => {
			console.log(res.data);

			if (res.success) {
				this.material_data = res.data;
			} else {
				this.material_data = [];
			}
		});
	}

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
					this.sgs.request('post', 'xfile/empDocuments', fd, (response) => {
						if (response.success) {
							this.elEventListenerActive = false;
							this.imageInfo = {
								fileName: file.name,
								link: response.data.name,
								type: file.type,
							};

							el.removeEventListener('change', handler);
						} else {
							el.removeEventListener('change', handler);
						}
					});
				} else {
					ev.target.innerHTML = 'Browse';
					this.elEventListenerActive = false;
					el.removeEventListener('change', handler);
				}
			} catch (e) {
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

	removeImage(data: string) {
		if (data) {
			this.sgs.request('post', 'xfile/deleteEmpDocument', { link: data }, async (response) => {});
			this.sgs.showToaster('success', 'Image has been removed.', 'Success', 2000, 'bottom-right');
			this.imageInfo = undefined;
		}
	}
	addDocBackground(form) {
		let file = {
			fileName: this.imageInfo.fileName,
			link: this.imageInfo.link,
			type: this.imageInfo.type,
		};
		this.sgs.request('post', 'truck_material/add_image_update', { file: file, id: this.data.id }, async (res) => {
			if (res.success) {
				this.imageInfo = undefined;
			} else {
				this.imageInfo = undefined;
			}
		});
	}

	editImg(img) {
		const activeModal = this.sgs.Modal({ img }, { component: UpdateMaterialImageComponent, size: 'md' });
	}
	removeImg(id) {
		this.sgs
			.Modal(
				{
					header: `System Message`,
					content: `Are you sure you want to delete this Image ?`,
					type: 'confirmation',
					buttonName: 'close',
				},
				{ size: 'sm' }
			)
			.confirm.subscribe((response) => {
				if (response == true) {
					this.sgs.request('post', 'truck_material/deleteImg', { id: id }, async (res) => {
						if (res.success) {
							this.sgs.showToaster('success', 'Document successfully deleted.', 'Success', 2000, 'bottom-right');
						}
					});
				}
			});
	}
	viewImg(link) {
		this.sgs.Modal(
			{
				header: `Image Viewer`,
				content: `
        <img id='image-source' src="${this.sgs.connection}/empDocuments/${link}">
      `,
				buttonName: 'close',
			},
			{ size: 'md' }
		);
	}
}
