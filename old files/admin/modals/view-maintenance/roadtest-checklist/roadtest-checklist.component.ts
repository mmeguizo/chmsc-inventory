// import { Component, OnInit, Input } from '@angular/core';
// import * as _ from 'lodash';
// import { SharedGlobalService } from '../../../../@core/services/shared.global.service';
// import * as moment from 'moment';

// @Component({
//   selector: 'ngx-roadtest-checklist',
//   templateUrl: './roadtest-checklist.component.html',
//   styleUrls: ['./roadtest-checklist.component.scss'],
// })
// export class RoadtestChecklistComponent implements OnInit {
//   @Input() data: any;
//   plate;
//   date;
//   kmReading;
//   hourReading;
//   truckModel: string;
//   truckType: string;
//   inspectedBy;
//   model = ['BEIBEN', 'FORLAND', 'DAYUN', 'ISUZU', 'SINOTRUCK'];
//   type = ['10W', '8W', '6W', '4W', 'TRAILER'];
//   road = [];
//   constructor(public sgs: SharedGlobalService) {}

//   ngOnInit(): void {
//     this.findRTCbyId();
//     this.testRoadtest();
//   }

//   check(event, index) {
//     if (event.checked) {
//       const result = this.road[index];
//       result.ok = true;
//     } else {
//       const result = this.road[index];
//       result.ok = false;
//     }
//   }

//   testRoadtest() {
//     this.road = [
//       { name: 'ENGINE CONDITION', reason: '', ok: false },
//       { name: 'HARD STARTING', reason: '', ok: false },
//       { name: 'IDLE SPEED / RPM', reason: '', ok: false },
//       { name: 'ENGINE POWER', reason: '', ok: false },
//       { name: 'COOLING SYSTEM', reason: '', ok: false },
//       { name: 'CHARGING SYSTEM', reason: '', ok: false },

//       { name: 'AIR BRAKE PRESSURE', reason: '', ok: false },
//       { name: 'BRAKE CLEARANCE', reason: '', ok: false },
//       { name: 'HAND BRAKE', reason: '', ok: false },
//       { name: 'MAXI BRAKE', reason: '', ok: false },

//       { name: 'CLUTCH CLEARANCE', reason: '', ok: false },
//       { name: 'SHIFTING', reason: '', ok: false },

//       { name: 'HEADLIGHTS', reason: '', ok: false },
//       { name: 'STOP LIGHTS', reason: '', ok: false },
//       { name: 'HAZARD', reason: '', ok: false },
//       { name: 'CABIN LIGHTS', reason: '', ok: false },
//       { name: 'CLEARANCE LIGHTS', reason: '', ok: false },
//       { name: 'BACK UP LIGHTS', reason: '', ok: false },
//       { name: 'BACK UP HORN', reason: '', ok: false },
//       { name: 'WIPER', reason: '', ok: false },

//       { name: 'AIR CONDITION', reason: '', ok: false },
//       { name: 'TIRES', reason: '', ok: false },
//       { name: 'UNDER CHASSIS', reason: '', ok: false },
//     ];
//   }

//   findRTCbyId() {
//     this.sgs.request('get', 'truck/findRTCbyId', { id: this.data }, async (res) => {
//       // console.log(res.data[0].roadtest.report.length);

//       if (res.success) {
//         if (res.data[0].roadtest !== undefined) {
//           this.date = res.data[0].roadtest.date !== undefined ? moment(res.data[0].roadtest.date).format('MM/DD/YY') : '';
//           this.plate = res.data[0].roadtest.plate !== undefined ? res.data[0].roadtest.plate : '';
//           this.kmReading = res.data[0].roadtest.kmReading !== undefined ? res.data[0].roadtest.kmReading : '';
//           this.inspectedBy = res.data[0].roadtest.inspectedBy !== undefined ? res.data[0].roadtest.inspectedBy : '';
//           this.hourReading = res.data[0].roadtest.hourReading !== undefined ? res.data[0].roadtest.hourReading : '';
//           this.truckModel = res.data[0].roadtest.truckmodel !== undefined ? res.data[0].roadtest.truckmodel : '';
//           this.truckType = res.data[0].roadtest.trucktype !== undefined ? res.data[0].roadtest.trucktype : '';
//           this.road = res.data[0].roadtest.report.length !== 0 ? res.data[0].roadtest.report : this.road;
//         }
//       }
//     });
//   }

//   save() {
//     let roadTestChecklist = {
//       id: this.data,
//       date: this.date,
//       plate: this.plate,
//       kmReading: this.kmReading,
//       hourReading: this.hourReading,
//       truckmodel: this.truckModel,
//       trucktype: this.truckType,
//       report: this.road,
//       inspectedBy: this.inspectedBy,
//     };

//     this.sgs.request('put', 'truck/addRoadTestChecklist', { form: roadTestChecklist }, async (res) => {
//       if (res.success) {
//         this.sgs.showToaster('success', 'Save successfully...', 'Success', 2000, 'bottom-right');
//       }
//     });
//   }
// }
