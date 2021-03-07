import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import * as _ from 'lodash';
@Component({
    selector: 'ngx-broken-material-request',
    templateUrl: './broken-material-request.component.html',
    styleUrls: ['./broken-material-request.component.scss']
})
export class BrokenMaterialRequestComponent implements OnInit {
    @Output() passEntry: EventEmitter<number> = new EventEmitter<number>();
    public filterQuery = '';
    public sortBy = 'id';
    public sortOrder = 'asc';
    public selectQueryString = 'Truck Category';
    public selectQuery = 'id';
    public socketInstance;
    public loading = false;
    public data: []
    public d: []

    @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
    @ViewChild("search", { static: false }) nameField: ElementRef;
    constructor(
        public sgs: SharedGlobalService,
        public ngbModal: NgbModal
    ) {
        this.socketInstance = sgs.ResponseSocket('newBrokenRequest').subscribe(emitted => {
            if (emitted) {
                this.getBrokenRequest()
            }
        });
    }
    ngOnInit(): void {
        this.getBrokenRequest()
    }
    selectFilter(name, value) {
        this.selectQuery = name;
        this.selectQueryString = value;
        this.popover.hide();
        setTimeout(() => this.nameField.nativeElement.focus(), 0);
        this.filterQuery = "";
    }
    getBrokenRequest() {
        this.sgs.request('get', 'brokenRequest/getAllBroken', null, async (res) => {
            res.success ? (this.data = res.data,
                this.passEntry.emit(res.data.length))
                : (this.data = [], this.passEntry.emit(0))
        })
    }
    delete(id, index) {
        this.sgs.Modal({
            header: `Are you sure you want to delete?`,
            content: `Deleting request #${index}?`,
            type: 'confirmation',
        }, { size: 'sm' })

            .confirm.subscribe(response => {
                if (response) {
                    this.sgs.request('post', 'brokenRequest/deleteBroken', { id }, async (res) => {
                        res.success ?
                            (_.remove(this.data, { id: id }),
                                this.passEntry.emit(this.data.length)
                            )
                            : alert('Please contact your admins')
                    })
                }
            });
    }
}
