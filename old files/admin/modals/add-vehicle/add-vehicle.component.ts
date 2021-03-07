import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { UpdatTruckReqComponent } from '../updat-truck-req/updat-truck-req.component';

@Component({
	selector: 'ngx-add-vehicle',
	templateUrl: './add-vehicle.component.html',
	styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent implements OnInit {
	public form: any;
	public categoryData = [];
	public typeData = [];
	public gearBox: any;
	public brakes: any;
	public operatingCharacteristics: any;
	public data: any;
    public loading = true;
    

	public requiredField: any = [];
    public fieldName: any;
    
	public truckModel: any;
	public truckType: boolean;
	public plate: boolean;
	public color: boolean;
	public weight: boolean;
	public length: boolean;
	public capacity: boolean;
	public batterySize: boolean;
	public tireSize: boolean;
	public garage: boolean;
	public or: boolean;
	public cr: boolean;
	public renewal: boolean;
	public insuranceRenewal : boolean;
	public insurance: boolean;
	public dateRegister: boolean;
	public engine: boolean;
    public chassis: boolean;
    
	public socketInstance;
	public value = '';

	constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService) {
		this.socketInstance = sgs.ResponseSocket('truckReq').subscribe((emitted) => {
			this.getTruckReq();
		});
		this.createForm();
	}

	createForm() {
		this.form = this.formBuilder.group({
			truckModel: ['',  ],
			truckType: ['',  ],
			engine: ['',  ],
			chassis: ['',  ],
			plate: ['',  ],
			color: ['',  ],
			weight: ['',  ],
			length: ['',  ],
			capacity: ['',  ],
			category: ['',  ],
			tireSize: ['',  ],
			batterySize: ['',  ],
			garage: ['',  ],
			or: ['',  ],
			cr: ['',  ],
			renewal: ['',  ],
			dateRegister: ['',  ],
			insurance: ['',  ],
			insuranceRenewal: ['',  ],
		});
	}

	ngOnInit() {
		// this.getTruckTypes();
		this.getTruckReq();
		this.checkCategory();
		this.checkType();
	}
	ngOnDestroy() {
		this.socketInstance.unsubscribe();
	}

	checkCategory() {
		this.sgs.request('get', 'category/checkCategory', null, async (res) => {
			if (res.success) {
				this.categoryData = await res.data;
			} else {
				this.categoryData = [];
			}
		});
	}
	checkType() {
		this.sgs.request('get', 'type/checkType', null, async (res) => {

            console.log(
                {'checktype' : res.data}
            );
            

			if (res.success) {
				this.typeData = await res.data;
			} else {
				this.typeData = [];
			}
		});
	}
	getTruckReq() {
		this.truckModel = false;
		this.truckType = false;
		this.plate = false;
		this.engine = false;
		this.chassis = false;
		this.color = false;
		this.weight = false;
		this.length = false;
		this.capacity = false;
		this.tireSize = false;
		this.batterySize = false;
		this.garage = false;
		this.or = false;
		this.cr = false;
		this.dateRegister = false;
		this.renewal = false;
		this.insurance = false;
		this.insuranceRenewal = false;
		this.sgs.request('get', 'required_field/getTruckReq', {}, async (res) => {

			if (res.success) {
				this.requiredField = res.data[0].fields;
				this.requiredField.map((field) => {
					let fieldName = field.fieldName;
					if (fieldName === 'truckModel') {
						this.truckModel = true;
					} else if (fieldName === 'truckType') {
						this.truckType = true;
					} else if (fieldName === 'plate') {
						this.plate = true;
					} else if (fieldName === 'engine') {
						this.engine = true;
					} else if (fieldName === 'chassis') {
						this.chassis = true;
					} else if (fieldName === 'color') {
						this.color = true;
					} else if (fieldName === 'weight') {
						this.weight = true;
					} else if (fieldName === 'length') {
						this.length = true;
					} else if (fieldName === 'capacity') {
						this.capacity = true;
					} else if (fieldName === 'tireSize') {
						this.tireSize = true;
					} else if (fieldName === 'batterySize') {
						this.batterySize = true;
					} else if (fieldName === 'garage') {
						this.garage = true;
					} else if (fieldName === 'or') {
						this.or = true;
					} else if (fieldName === 'cr') {
						this.cr = true;
					} else if (fieldName === 'dateRegister') {
						this.dateRegister = true;
					} else if (fieldName === 'renewal') {
						this.renewal = true;
					} else if (fieldName === 'insurance') {
						this.insurance = true;
					} else if (fieldName === 'insuranceRenewal') {
						this.insuranceRenewal = true;
					}
                });
			} else {
				this.requiredField = [];
            }
            
            console.log('getTruckReq!!!!',this.requiredField.map(e => e.fieldName));
            console.log(this.insuranceRenewal);
            

		});
	}

	//   getTruckTypes(){
	//     this.sgs.request('get', 'truckSetting/getTruckTypes', null, async (res) => {
	//         console.log(res.data);

	//       if( res.success ){
	//         this.data = res.data;
	//         this.loading = false;
	//       }else{
	//         this.data = [];
	//         this.loading = false;
	//       }
	//     });
	//   }
	updateTruckReq() {
		this.sgs.Modal({}, { component: UpdatTruckReqComponent, size: 'md' });
	}
	closeModal() {
		this.activeModal.close();
	}

	save() {
		console.log(this.form.value.category);

		this.sgs.request(
			'post',
			'truck/addVehicle',
			{
				form: this.form.value,
				requiredField: this.requiredField,
			},
			async (res) => {
				if (res.success) {
					this.sgs.showToaster('success', 'New Truck has been added.', 'Success', 2000, 'bottom-right');
					this.closeModal();
				}
			}
		);
	}

	public imageLoader = false;
	public elEventListenerActive: boolean;
	public documents = [];
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
					this.sgs.request('post', 'xfile/documents', fd, (response) => {
						if (response.success) {
							this.elEventListenerActive = false;
							this.documents.push({
								fileName: file.name,
								link: response.data.name,
								type: file.type,
							});
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

	removeDocument(data: string) {
		const index: number = this.documents.indexOf(data);
		if (index !== -1) {
			this.sgs.request('post', 'xfile/deleteDocument', { link: data.link }, async (response) => {});
			this.documents.splice(index, 1);
		}
	}

	viewDocument(link) {
		this.sgs.Modal(
			{
				header: `Image Viewer`,
				content: `
        <img id='image-source' src="${this.sgs.connection}/documents/${link}">
      `,
				buttonName: 'close',
			},
			{ size: 'lg' }
		);
	}
}
