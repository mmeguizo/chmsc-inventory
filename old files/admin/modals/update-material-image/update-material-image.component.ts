import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'ngx-update-material-image',
  templateUrl: './update-material-image.component.html',
  styleUrls: ['./update-material-image.component.scss']
})
export class UpdateMaterialImageComponent implements OnInit {
  img
  public imageInfo: any;
  public imageLoader = false;
  public elEventListenerActive: boolean;
  public documents = [];

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public sgs: SharedGlobalService
  ) { }

  ngOnInit() {
    this.imageInfo = {
      fileName: this.img.fileName,
      link: this.img.link,
      type: this.img.type
    }

  }


  closeModal(){
    this.activeModal.close()
  }

  openFile(ev, id) {
    let file,
      el = document.getElementById(id);
    el.click();
    let handler = (fc) => {
      try {
        let fileList: any;
        let fd = new FormData();
        if (fc.target['files'][0]['name'] !== undefined) {
          fileList = fc.target;
          let file: File = fileList.files[0];
          fd.append('degree_attachment', file, file.name);
          this.sgs.submitting = true;
          this.sgs.request('post', 'xfile/empDocuments', fd, response => {
            if (response.success) {
              this.elEventListenerActive = false;
              this.imageInfo = {
                fileName: file.name,
                link: response.data.name,
                type: file.type
              }

              el.removeEventListener('change', handler);
            } else {
              el.removeEventListener('change', handler);
            }
          });
        } else {
          ev.target.innerHTML = 'Browse';
          this.elEventListenerActive = false;
          el.removeEventListener('change', handler);
        }
      } catch (e) {
        ev.target.innerHTML = 'Browse';
        this.elEventListenerActive = false;
        el.removeEventListener('change', handler);
      }
    }
    if (!this.elEventListenerActive) {
      el.addEventListener('change', handler);
      this.elEventListenerActive = true;
  }
}

update(){
  this.sgs.request('post', 'truck_material/updateImg', {
      _id : this.img._id,
      fileName: this.imageInfo.fileName,
      link: this.imageInfo.link,
      type: this.imageInfo.type
  }, (res => {
    if(res.success){
      this.sgs.showToaster('success', 'Image has been updated successfully.','Success', 2000, 'bottom-right');
      this.closeModal()

    }
    else{
      this.sgs.showToaster('warning', 'No changes found.','Warning', 2000, 'bottom-right');
      this.closeModal()



    }

  }))

}

}

