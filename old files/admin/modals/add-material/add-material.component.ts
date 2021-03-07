import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import * as _ from 'lodash';

@Component({
	selector: 'ngx-add-material',
	templateUrl: './add-material.component.html',
	styleUrls: ['./add-material.component.scss'],
})
export class AddMaterialComponent implements OnInit {
	public form: any;
	public imageLoader = false;
	public elEventListenerActive: boolean;
	public documents = [];
	public data = [];
	public material_data = [];
	public images = [];
	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService) {
		this.createForm();
	}

	ngOnInit() {}

	createForm() {
		this.form = this.formBuilder.group({
			name: ['', [Validators.required]],
			description: ['', [Validators.required]],
			brand: ['', [Validators.required]],
		});
	}

	closeModal() {
		this.activeModal.close();
	}

	save() {
		console.log('save this documents');

		console.log(this.documents);
		console.log('save this images');

		console.log(this.images);

		let documnents = [];

		this.documents.map((e) => {
			console.log('EEEEE', e);
			console.log('e.fileefefefe', e.file);

			documnents.push({ fileName: e.file.name, link: e.file.link, type: e.file.type });
		});

		this.sgs.request('post', 'truck_material/addMaterial', { form: this.form.value, files: documnents }, async (res) => {
			if (res.success) {
				this.sgs.showToaster('success', 'Material has been added.', 'Success', 2000, 'bottom-right');
				this.closeModal();
			} else {
				this.sgs.showToaster('warning', 'Please check the fields.', 'Warning', 2000, 'bottom-right');
			}
		});
	}

	openFile(ev, id) {
		let file,
			el = document.getElementById(id);
		el.click();
		let handler = (fc) => {
			try {
				console.log('test target files', fc.target['files']);

				Array.from(fc.target['files']).filter((item) => {
					console.log(item, 'ITEMTEMEMTE');
					this.images.push({ file: item, value: 0 });
				});
				this.images.filter((item, index) => {
					this.imageLoader = true;
					let fd = new FormData();
					fd.append('degree_attachment', item.file, item.file.name);
					this.sgs.submitting = true;
					this.sgs.request('post', 'xfile/empDocuments', fd, async (response) => {
						if (response.success) {
							this.images[index].file.link = response.data.name;
							//	el.removeEventListener('change', handler);
						} else {
							//	el.removeEventListener('change', handler);
						}
					});
					this.imageLoader = false;
				});

				this.imageLoader = false;
				el.addEventListener('change', handler);
				this.elEventListenerActive = true;
				//  this.images = this.temp_images
				//   this.image_loading = false;
			} catch (e) {
				ev.target.innerHTML = 'Browse';
				this.elEventListenerActive = false;
				el.removeEventListener('change', handler);
			}
			//flush target files data
			//	fc.target['files'] = [];
		};
		if (!this.elEventListenerActive) {
			el.addEventListener('change', handler);
			this.elEventListenerActive = true;
		}
	}

	removeImage(data: string, remove: number) {
		console.log('removeImage', data, remove);

		if (data) {
			//remove images link in db
			this.sgs.request('post', 'xfile/deleteEmpDocument', { link: data }, async (response) => {});
			this.sgs.showToaster('success', 'Image has been removed.', 'Success', 2000, 'bottom-right');

			//remove picture in images
			for (var i = 0; i < this.images.length; i++)
				if (this.images[i].file.link === data) {
					this.images.splice(i, 1);
					break;
				}
			console.log('removeer images', this.images);
		}
	}

	addDocBackground(form) {
		console.log('addDocBackground');
		console.log(form.value);
		console.log('images');
		console.log(this.images);
		console.log('documents');
		console.log(this.documents);

		if (this.documents.length === 0) {
			this.documents = this.images;
		} else {
			//	this.documents.concat(this.images);
			this.documents.push(...this.images);
		}
		//reset images views to zero
		this.images = [];

		console.log('this.documents');

		console.log(this.documents);
	}

	removeImg(image) {
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
				if (response) {
					//reset the array
					//for multi upload check the below code
					for (var i = 0; i < this.documents.length; i++)
						if (this.documents[i].file.link === image) {
							this.documents.splice(i, 1);
							break;
						}
				}
			});
	}
}

/*
preparations for multi upload delete
https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript
for (var i =0; i < someArray.length; i++)
   if (someArray[i].name === "Kristian") {
      someArray.splice(i,1);
      break;
   }
*/
