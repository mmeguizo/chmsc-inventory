import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { async } from 'rxjs/internal/scheduler/async';
import { UpdateMaterialComponent } from '../modals/update-material/update-material.component';
import { AddMaterialComponent } from '../modals/add-material/add-material.component';
@Component({
    selector: 'ngx-truck-materials',
    templateUrl: './truck-materials.component.html',
    styleUrls: ['./truck-materials.component.scss']
})
export class TruckMaterialsComponent implements OnInit {
    public data = [];
    public make = [];
    public filterQuery = '';
    public sortBy = 'id';
    public sortOrder = 'asc';
    public selectQueryString = 'Material  ID';
    public selectQuery = 'id';

    public socketInstance;
    public loading = true;


    @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
    @ViewChild("search", { static: false }) nameField: ElementRef;

    constructor(
        public sgs: SharedGlobalService,
        public ngbModal: NgbModal

        ) {
        this.socketInstance = sgs.ResponseSocket('deleteMaterials').subscribe(emitted => {
            this.get_all_materials();
        });
        this.socketInstance = sgs.ResponseSocket('addMaterial').subscribe(emitted => {
            this.get_all_materials();
        });
        this.socketInstance = sgs.ResponseSocket('materialsUpdate').subscribe(emitted => {
            this.get_all_materials();
        });

    }

    ngOnInit() {
        this.get_all_materials()
    }

    selectFilter(name, value) {
        this.selectQuery = name;
        this.selectQueryString = value;
        this.popover.hide();
        setTimeout(() => this.nameField.nativeElement.focus(), 0);
        this.filterQuery = "";
    }

    ngOnDestroy() {
        this.socketInstance.unsubscribe()
    }

    addMaterials() {
        this.sgs.Modal(
            {},
            { component: AddMaterialComponent, size: 'xl' }
        )
    }

    get_all_materials() {
        this.sgs.request('get', 'truck_material/get_all_materials', {}, async (res) => {
            console.log(res.data);

            if (res.success && res.data.length >= 1) {
                this.data = res.data
                this.loading = false
            }
            else {
                this.data = []
                this.loading = false

            }
        })
    }


    delete(id) {
        this.sgs.Modal({
            header: `System Message`,
            content: `Are you sure you want to delete this Material ?`,
            type: 'confirmation',
            buttonName: 'close'
        }, { size: 'sm' })
            .confirm.subscribe(response => {
                if (response) {
                    this.sgs.request('post', 'truck_material/delete_materials', { id: id }, async (res) => {
                        if (res.success) {
                            this.sgs.showToaster('success', 'Material successfully deleted.', 'Success', 2000, 'bottom-right');

                        }
                    })
                }

            })

    }
    update(data) {
        this.sgs.Modal(
            { data },
            { component: UpdateMaterialComponent, size: 'xl' }
        )
    }


    viewImg(link) {
        this.sgs.Modal({
            header: `Image Viewer`,
            content: `
            <img id='image-source' src="${this.sgs.connection}/empDocuments/${link}">
          `,
            buttonName: 'close'
        }, { size: 'md' })
    }
}
