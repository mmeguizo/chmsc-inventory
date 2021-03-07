import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { SharedGlobalService } from '../../../../@core/services/shared.global.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-broken-request',
  templateUrl: './broken-request.component.html',
  styleUrls: ['./broken-request.component.scss']
})
export class BrokenRequestComponent implements OnInit {
data 
truckDetails
date 
time 
mechanicNote
inspectedBy
acknowledgeBy   
  constructor(
      public _route : Router,
      public sgs : SharedGlobalService,
      public activeModal : NgbActiveModal
  ) { }
 
  ngOnInit(): void {
    this.data.map(data => {
        data.qty = 0
        return data
    })

    
  }
    closeModal(){
        this.activeModal.close()
    }
    
    singleRemove(i){
        
        let confirmation = confirm('Are you sure you want to remove this item?')
        if(confirmation){
            let remove = _.pullAt(this.data, [i])
            console.log(remove);
            
        }
          

    }
    saveRequest(){
      this.sgs.request('post', 'brokenRequest/addBrokenRequest',{
          brokenMaterials : this.data,
          truckid : this.truckDetails.id,
          date : this.date,
          time : this.time,
          mechanicNote : this.mechanicNote,
          inspectedBy : this.inspectedBy,
          acknowledgeBy : this.acknowledgeBy
      },async(res) => { 
          if(res.success){
               this.sgs.showToaster('success', 'Maintenance successfully deleted.', 'Success', 2000, 'bottom-right');
               this.activeModal.close(true)
          }
      })
        
    }

}
