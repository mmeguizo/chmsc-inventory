import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import * as moment from 'moment';

@Component({
  selector: 'ngx-update-ordometer',
  templateUrl: './update-ordometer.component.html',
  styleUrls: ['./update-ordometer.component.scss']
})
export class UpdateOrdometerComponent implements OnInit {
  data
  public ordometer: number;

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService
  ) { }

  ngOnInit(): void {

  }

  closeModal() {
    this.activeModal.close()
  }

  updateOrdometer() {
    if (this.ordometer != undefined) {
      this.sgs.request('post', 'truck/updateOrdometer', {
        truckId: this.data.id,
        ordometer: this.ordometer
      }, async (res) => {
        if (res.success) {
          this.closeModal();
          this.sgs.showToaster('success', 'New Odometer / Mileage successfully updated.', 'Success', 2000, 'bottom-right')
        } else {
          this.closeModal();
          this.sgs.showToaster('warning', 'Error updating!', 'Warning', 2000, 'bottom-right')
        }
      });
    }
  }
}
