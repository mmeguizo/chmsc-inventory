import { Component, OnInit, Input } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'ngx-maintenancerepair',
  templateUrl: './maintenancerepair.component.html',
  styleUrls: ['./maintenancerepair.component.scss']
})
export class MaintenancerepairComponent implements OnInit {
  @Input() datas: any;


  public loading = true;
  public data = [];
  public truck_id = 0;


  public socketInstance;
  public filterQuery = '';
  public sortBy = 'id';
  public sortOrder = 'asc';
  public selectQueryString = 'Truck ID';
  public selectQuery = 'id'
  public dates = new Date().toISOString().split('T')[0]

  plate;
  constructor(
    public sgs: SharedGlobalService,
    public route: ActivatedRoute,

  ) { }

  ngOnInit(): void {


    console.log('tester');
    this.truck_id = parseInt(this.route.snapshot.params['id']);
    { this.truck_id && this.getAllMaintenance() }
    console.log(this.sgs.Getter('ordometer'));
    console.log(this.dates);

  }

  getAllMaintenance() {
    this.sgs.request('get', 'truck_maintenance/getMaintenance', { id: this.datas[0] || this.truck_id }, async (res) => {
      console.log(res);

      if (res.success) {
        this.loading = false;
        this.data = res.data;
        console.log(this.data);
      } else {
        this.loading = false;
        this.data = [];
      }
    });
  }


}
