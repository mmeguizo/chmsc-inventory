import { Component, OnInit } from '@angular/core';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReverseDate } from '../../../@core/pipes/dataFilter';

@Component({
  selector: 'ngx-print-payslip',
  templateUrl: './print-payslip.component.html',
  styleUrls: ['./print-payslip.component.scss']
})
export class PrintPayslipComponent implements OnInit {

  public summary: any;
  public from: any;
  public to: any;
  public dateAdded: any;
  public user: any;
  public date = new Date();
  public payrollID: any;
  public loading = false;

  // address = {
  //   "address1": "G/F 102, RMC MPC Building, 22nd Street, Brgy. 5, Bacolod City",
  //   "address2": "MARVIN Q. HERMOSURA - Proprietor",
  //   "address3": "VAT REG No. 936-595-907-0000",
  //   "address4": "Telefax (034) 707-0844"
  //  }

  constructor(
    public sgs: SharedGlobalService,
    public ngbModal: NgbModal,
    public activeModal: NgbActiveModal,
    public rd: ReverseDate
  ) { }

  ngOnInit() {
    this.getUser();
    console.log(this.summary);

  }

  getUser(){
    this.sgs.request('get', 'user/getSecuredUser', {uid: this.summary.eid}, async (res) => {
      if(res.success){
        this.user = res.data[0];
      }else{
        this.user = [];
      }
    })
  }

  closeModal(){
    this.activeModal.close();
  }

  printed(){

    this.sgs.Modal({
      header : `Printing Payslip`,
      content : `By Printing you agree to the information?`,
      type : `confirmation`
    },{size : 'sm'})
    .confirm.subscribe(response => {
      if(response){

          this.sgs.request('put', 'payroll/printed', {pid: this.payrollID, eid: this.summary.eid}, async (res) => {
            if(res.success){
              console.log(res.data)
            }
          });
          setTimeout(() => {
          let printContents, popupWin;
          printContents = document.getElementById('print-section').innerHTML;
          popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
          popupWin.document.open();
          popupWin.document.write(`
            <html>
              <head>
                <title>Print</title>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                <style>
                .body-content {
                  font-family: Arial;
                  font-size: 10px;
                }
                .body-content div:first-child {
                  padding-bottom: 5px !important;
                }
                .acenter{
                  text-align: center;
                }
                .aright{
                  text-align: right;
                }
                #print-section {
                  height: 8in;
                }
                .payslip-container{
                  width: 100%;
                  border: 1px solid black;
                  margin-top: 20px;
                }
                .hmed-logo{
                    width: 75px;
                    margin-top:15px;
                    margin-left:10px;
                }
                .header{
                    margin-left: -10%;
                    margin-top: 10px;
                }
                .table th, .table td{
                    padding: 0.30rem;
                    padding-left: 10px;
                }
                .bordered-left{
                    border-left: 2px solid #dee2e6;
                }
                @media print {
                  @page {
                    margin-left: 2mm;
                    margin-top: 0mm;
                    size: portrait;
                  }
                }
                </style>
              </head>
              <body onload="window.print();window.close()">
                <div class="col-sm-12 col-12" id="print-section">
                  <div id="page">
                    ${printContents}
                  </div>
                </div>
              </body>
            </html>`,
          );

        //  this.printed();
        popupWin.document.close();
        this.closeModal();
          }, 200);

         // this.closeModal();
      }
      else {
        this.closeModal();
      }
    })

  }


}
