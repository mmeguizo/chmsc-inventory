import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
@Component({
  selector: 'ngx-update-employee-doc-image',
  templateUrl: './update-employee-doc-image.component.html',
  styleUrls: ['./update-employee-doc-image.component.scss']
})
export class UpdateEmployeeDocImageComponent implements OnInit {
image
id
fileId
  constructor(
    public activeModal: NgbActiveModal,
    public sgs: SharedGlobalService
  ) { }

  ngOnInit(): void {
  }
  closeModal(){
    this.activeModal.close()
  }
  removeImg(id, i){
    this.sgs.Modal({
      header : `System Message`,
      content :  `Are you sure you want to delete this Image ?`,
      type :'confirmation',
      buttonName: 'close'
    },{size : 'sm'})
    .confirm.subscribe( response => {
      if(response == true){
        this.sgs.request('post', 'employee/deleteImg', {imgId : id,id : this.id, fileId : this.fileId } , async(res) => {
          if(res.success){
            this.image.splice(i, 1)
            this.sgs.showToaster('success', 'Document successfully deleted.', 'Success', 2000, 'bottom-right');
          }
       })
      }




    })
  }

  viewImg(link){
    this.sgs.Modal({
      header: `Image Viewer`,
      content: `
        <img id='image-source' src="${this.sgs.connection}/empDocuments/${link}">
      `,
      buttonName: 'close'
    }, { size: 'lg' })

  }
}
