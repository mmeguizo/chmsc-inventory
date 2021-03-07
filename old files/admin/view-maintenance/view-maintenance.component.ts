import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import * as moment from 'moment';
import { UpdateChangeOilComponent } from '../modals/update-change-oil/update-change-oil.component';
import { UpdateOrdometerComponent } from '../modals/update-ordometer/update-ordometer.component';
import { AddTruckMaintenanceComponent } from '../modals/add-truck-maintenance/add-truck-maintenance.component';
import { UpdateTruckMaintenanceComponent } from '../modals/update-truck-maintenance/update-truck-maintenance.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReverseDate } from '../../@core/pipes/dataFilter';

@Component({
  selector: 'ngx-view-maintenance',
  templateUrl: './view-maintenance.component.html',
  styleUrls: ['./view-maintenance.component.scss'],
})
export class ViewMaintenanceComponent implements OnInit {
  truckInfo;
  public data = [];
  public loading = true;
  public form: any;
  lastGearOil: any;
  lastChangeOil: any;
  nextGearOil: any;
  nextChangeOil: any;
  ordometer: number;
  public socketInstance;
  public filterQuery = '';
  public sortBy = 'id';
  public sortOrder = 'asc';
  public selectQueryString = 'Truck ID';
  public selectQuery = 'id';
  public truck_id = 0;
  truckCatergory: any;
  truckModel: any;
  constructor(public activeModal: NgbActiveModal, public formBuilder: FormBuilder, public sgs: SharedGlobalService, public route: ActivatedRoute, public rd: ReverseDate) {
    this.truck_id = parseInt(this.route.snapshot.params['id']);
    this.socketInstance = sgs.ResponseSocket('updatechangeoil').subscribe((emitted) => {
      if (emitted.success) {
        this.lastChangeOil = this.rd.transform(emitted.data[0].lastChangeOil).toISOString().split('T')[0];
        this.lastGearOil = this.rd.transform(emitted.data[0].lastGearOil).toISOString().split('T')[0];
        this.nextChangeOil = this.rd.transform(emitted.data[0].nextChangeOil).toISOString().split('T')[0];
        this.nextGearOil = this.rd.transform(emitted.data[0].nextGearOil).toISOString().split('T')[0];
      }
      this.getAllMaintenance();
    });
    this.socketInstance = sgs.ResponseSocket('updateordometer').subscribe((emitted) => {
      if (emitted.success) {
        this.getAllMaintenance();
        this.ordometer = emitted.data.ordometer;
      }
    });
    this.socketInstance = sgs.ResponseSocket('truckMaintenance').subscribe((emitted) => {
      if (emitted.success) {
        this.getAllMaintenance();
      }
    });
    this.socketInstance = sgs.ResponseSocket('deleteMaintenance').subscribe((emitted) => {
      if (emitted.success) {
        this.getAllMaintenance();
      }
    });
  }

  ngOnInit(): void {
    this.getAllVehicles();
    this.getAllMaintenance();
  }

  closeModal() {
    this.sgs.back();
  }

  getAllVehicles() {
    this.sgs.request('get', 'truck/getAllVehicles', { id: this.truck_id }, async (res) => {
      if (res.success && res.data.length > 0) {
        res.data.map(async (e) => {
          this.lastChangeOil = e.lastChangeOil ? this.rd.transform(e.lastChangeOil).toISOString().split('T')[0] : (e.lastChangeOil = '');
          this.lastGearOil = e.lastGearOil ? this.rd.transform(e.lastGearOil).toISOString().split('T')[0] : (e.lastGearOil = '');
          this.nextChangeOil = e.nextChangeOil ? this.rd.transform(e.nextChangeOil).toISOString().split('T')[0] : (e.nextChangeOil = '');
          this.nextGearOil = e.nextGearOil ? this.rd.transform(e.nextGearOil).toISOString().split('T')[0] : (e.nextGearOil = '');
          // this.nextGearOil = moment(this.rd.transform(e.nextGearOil)).format('MMM M, YYYY');
          this.ordometer = e.ordometer ? e.ordometer : 0;
          this.sgs.Setter({ ordometer: e.ordometer });
          this.truckCatergory = e.category;
          this.truckModel = e.truckModel;
          e.selected = false;
          this.loading = false;
        });
        this.truckInfo = res.data;
      } else {
        this.loading = false;
        this.truckInfo = [];
      }
    });
  }

  getAllMaintenance() {
    this.sgs.request('get', 'truck_maintenance/getMaintenance', { id: this.truck_id }, async (res) => {
      if (res.success) {
        this.loading = false;
        this.data = res.data;

      } else {
        this.loading = false;
        this.data = [];
      }
    });
  }

  updateChangeOil() {
    this.sgs.Modal(
      {
        truck: this.truckInfo[0],
      },
      { component: UpdateChangeOilComponent, size: 'md' }
    );
  }
  updateOrdometer(data) {
    let truck: any;
    this.truckInfo.map((e) => {
      e.ordometer = data;
      truck = e;
    });

    this.sgs.Modal(
      {
        data: truck,
      },
      { component: UpdateOrdometerComponent, size: 'sm' }
    );
  }

  addTruckMaintenance() {
    let truck: any;
    this.truckInfo.map((e) => (truck = e));

    this.sgs.Modal(
      {
        truck: truck,
      },
      { component: AddTruckMaintenanceComponent, size: 'lg' }
    );
  }

  view(datas) {

    this.sgs.Modal({ datas }, { component: UpdateTruckMaintenanceComponent, size: 'lg' });
  }

  deleteMaintenance(id) {
    this.sgs
      .Modal(
        {
          header: `System Message`,
          content: `Are you sure you want to delete this maintenance ?`,
          type: 'confirmation',
          buttonName: 'close',
        },
        { size: 'sm' }
      )
      .confirm.subscribe((response) => {
        if (response) {
          this.sgs.request('put', 'truck_maintenance/deleteMaintenance', { id: id }, async (res) => {
            if (res.success) {
              this.sgs.showToaster('success', 'Maintenance successfully deleted.', 'Success', 2000, 'bottom-right');
            }
          });
        }
      });
  }
}
