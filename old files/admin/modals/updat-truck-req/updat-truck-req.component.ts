import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder} from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'ngx-updat-truck-req',
  templateUrl: './updat-truck-req.component.html',
  styleUrls: ['./updat-truck-req.component.scss']
})
export class UpdatTruckReqComponent implements OnInit {
  public temp: any = [];
  public existingtemp: any = [];
  public MatchToexistingtemp: any = [];

  public requiredField: any = [];
  public fieldName: any;

//   public truckModel: any;
//   public truckType: boolean;
//   public plate: boolean;
//   public color: boolean;
//   public weight: boolean;
//   public length: boolean;
//   insurancecolorRenewal
//   public capacity: boolean;
//   public batterySize: boolean;
//   public tireSize: boolean;
//   public garage: boolean;
//   public or: boolean;
//   public cr: boolean;
//   public renewal: boolean;
//   public insuranceRenewal : boolean;
//   public insurance: boolean;
//   public dateRegister: boolean;
//   public engine: boolean;
//   public chassis: boolean;
public start = false
  public parts : any = [
      {id : 0,type :"truckModel" , status : false , name : "Name / model of truck "},
      {id : 1,type :"truckType", status : false , name : "Truck Type"},
      {id : 2,type :"plate" , status : false , name : "Plate Number"},
      {id : 3,type :"color" , status : false , name : "Body color"},
      {id : 4,type :"weight" , status : false , name : "Weight of truck"},
      {id : 5,type :"length" , status : false , name : "Length of truck"},
      {id : 6,type :"capaciy" , status : false , name : "Capacity"},
      {id : 7,type :"batterySize" , status : false , name : "Battery size"},
      {id : 8,type :"tireSize" , status : false , name : "Tires size"},
      {id : 9,type :"garage" , status : false , name : "Garage"},
      {id : 10,type :"or" , status : false , name : "CR #"},
      {id : 11,type :"cr" , status : false , name : "OR #"},
      {id : 12,type :"renewal" , status : false , name : "Truck Renewal"},
      {id : 13,type :"insuranceRenewal" , status : false , name : "Insurance renewal date"},
      {id : 14,type :"insurance" , status : false , name : "Insurance"},
      {id : 15,type :"dateRegister" , status : false , name : "Date of registration"},
      {id : 16,type :"engine" , status : false , name : "Engine Number"},
      {id : 17,type :"chassis" , status : false , name : "Chassis Number"}
  ]
constructor(
  public activeModal: NgbActiveModal,
  public formBuilder: FormBuilder,
  public sgs: SharedGlobalService
){}

  ngOnInit() {
 this.getTruckReq();
  }
  addItem(part: any) {
   

    let index = _.find(this.parts, (parts) => {
        return parts.id == part.id 
    })

    switch (index.status) {
        case true:
            index.status = false
            break;
            case false :
            index.status = true
                break;
        default:
            break;
    }

    
    // let indParticulars = {
    //     fieldName: event.target.value
    //   }

    // console.log('Event ', [event.target.value , event.target.checked] );
    //    // add to mathc existing if the they uncheck the exising data
    //   if( event.target.checked === false){   this.MatchToexistingtemp.push(  event.target.value  || null)  }


    // if (event.target.checked == true) {
    //   this.temp.push(indParticulars);
    // } else {
    //   let index = _.findIndex(this.temp, (data) => {
    //     return data.fieldName == indParticulars.fieldName;
    //   });
    //   if (index !== -1) {
    //     this.temp.splice(index, 1);
    //   }
    //   this.MatchToexistingtemp({ fieldName :  event.target.value})
    // }
  }
  update() {
    let obj = _.filter(this.parts, (part) => {
        return part.status == true
    })
   let trim = obj.map((ob) => {
       return {
        fieldName : ob.type
       }
   }) 
    
    this.sgs.request('post', 'required_field/updateTruckReq', {
        id: 101,
        formName: 'truck',
        fields: trim,
      }, async (res) => {
        if (res.success) {
          this.closeModal();
          this.sgs.showToaster('success', 'Required field update successfully.','Success', 2000, 'bottom-right');
  
        }
      });
//   //remove data from existing if match in match to exisitn g
//    if(this.MatchToexistingtemp.lengh !== 0){
//     this.existingtemp.filter(function(item){ 
//         return this.MatchToexistingtemp.indexOf( item.fieldName ) == -1; 
//      });
//    }

//       //combine all data 
//  var posted = [ ...new Set([ ...this.temp, ...this.existingtemp ]) ];

//     console.log('posted',posted);
    
   // this.posted(posted)

  

  }


  posted(data : any){
    console.log('posted',data);

    //remove duplicate data
    var filtered = _.uniqBy(data, 'fieldName');

    console.log('filtered',filtered);

    //  this.sgs.request('post', 'required_field/updateTruckReq', {
    //     id: 101,
    //     formName: 'truck',
    //     fields: filtered
    //   }, async (res) => {
    //     if (res.success) {
    //       this.closeModal();
    //       this.sgs.showToaster('success', 'Required field update successfully.','Success', 2000, 'bottom-right');
    //     }
    //   });
  }


  closeModal() {
    this.activeModal.close();
  }


  getTruckReq() {
    // this.truckModel = false;
    // this.truckType = false;
    // this.plate = false;
    // this.engine = false;
    // this.chassis = false;
    // this.color = false;
    // this.weight = false;
    // this.length = false;
    // this.capacity = false;
    // this.tireSize = false;
    // this.batterySize = false;
    // this.garage = false;
    // this.or = false;
    // this.cr = false;
    // this.dateRegister = false;
    // this.renewal = false;
    // this.insurance = false;
    // this.insuranceRenewal = false;
    this.sgs.request('get', 'required_field/getTruckReq', {}, async (res) => {
        if (res.success) {
            this.requiredField = res.data[0].fields;
            this.requiredField.map((field) => {
                let fieldName = field.fieldName;
                if (fieldName == 'truckModel') {
                    this.parts[0].status = true
                    // this.truckModel = true;
                    // this.existingtemp.unshift({ fieldName : 'truckModel'});
                } else if (fieldName == 'truckType') {
                    this.parts[1].status = true
                    // this.truckType = true;
                    // this.existingtemp.unshift({ fieldName : 'truckType'});

                } else if (fieldName == 'plate') {
                    this.parts[2].status = true
                    // this.plate = true;
                    // this.existingtemp.unshift({ fieldName : 'plate'});

                } else if (fieldName == 'engine') {
                    this.parts[16].status = true
                    // this.engine = true;
                    // this.existingtemp.unshift({ fieldName : 'trengineuckModel'});

                } else if (fieldName == 'chassis') {
                    this.parts[17].status = true

                    // this.chassis = true;
                    // this.existingtemp.unshift({ fieldName : 'chassis'});

                } else if (fieldName == 'color') {
                    this.parts[3].status = true

                    // this.color = true;
                    // this.existingtemp.unshift({ fieldName : 'color'});

                } else if (fieldName == 'weight') {
                    this.parts[4].status = true

                    // this.weight = true;
                    // this.existingtemp.unshift({ fieldName : 'weight'});

                } else if (fieldName == 'length') {
                    this.parts[5].status = true

                    // this.length = true;
                    // this.existingtemp.unshift({ fieldName : 'length'});

                } else if (fieldName == 'capacity') {
                    this.parts[6].status = true

                    // this.capacity = true;
                    // this.existingtemp.unshift({ fieldName : 'capacity'});

                } else if (fieldName == 'tireSize') {
                    this.parts[8].status = true

                    // this.tireSize = true;
                    // this.existingtemp.unshift({ fieldName : 'tireSize'});

                } else if (fieldName == 'batterySize') {
                    this.parts[7].status = true

                    // this.batterySize = true;
                    // this.existingtemp.unshift({ fieldName : 'batterySize'});

                } else if (fieldName == 'garage') {
                    this.parts[9].status = true

                    // this.garage = true;
                    // this.existingtemp.unshift({ fieldName : 'garage'});

                } else if (fieldName == 'or') {
                    this.parts[10].status = true

                    // this.or = true;
                    // this.existingtemp.unshift({ fieldName : 'or'});

                } else if (fieldName == 'cr') {
                    this.parts[11].status = true

                    // this.cr = true;
                    // this.existingtemp.unshift({ fieldName : 'cr'});

                } else if (fieldName == 'dateRegister') {
                    this.parts[15].status = true

                    // this.dateRegister = true;
                    // this.existingtemp.unshift({ fieldName : 'dateRegister'});

                } else if (fieldName == 'renewal') {
                    this.parts[12].status = true

                    // this.renewal = true;
                    // this.existingtemp.unshift({ fieldName : 'renewal'});

                } else if (fieldName == 'insurance') {
                    this.parts[14].status = true

                    // this.insurance = true;
                    // this.existingtemp.unshift({ fieldName : 'insurance'});

                } else if (fieldName == 'insuranceRenewal') {
                    this.parts[13].status = true
                    // this.insuranceRenewal = true;
                    // this.existingtemp.unshift({ fieldName : 'insuranceRenewal'});
                }


            });
       this.start = true
        } else {
            this.requiredField = [];
        }
    });
}
}
