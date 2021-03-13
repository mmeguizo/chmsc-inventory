
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/users.service';


@Component({
  selector: 'ngx-confimation',
  templateUrl: './confimation.component.html',
  styleUrls: ['./confimation.component.scss']
})
export class ConfimationComponent implements OnInit {

  @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();


  public id;
  public name;
  public form;
  public uid;
  public date;
  public selectedDate;
  public image;
  public message = '';
  public message1 = '';
  public data;


  constructor(

    public activeModal: NgbActiveModal,
    public auth: AuthService,
    public user_service: UserService


  ) {


  }

  ngOnInit(): void {

    console.log(this.data);

    this.name = this.data.username;

    if (this.data.status === 'active' && !this.data.delete) {

      this.message = 'Deactivation';
      this.message1 = 'Deactivating';

    } else if (this.data.status === 'inactive' && !this.data.delete) {
      this.message = 'Activation';
      this.message1 = 'Activating';
    } else if (this.data.delete) {
      console.log(this.data.delete);
      this.message = 'Delete';
      this.message1 = 'Deleting';
    }




  }


  no() {

    this.activeModal.close();
  }


  yes() {


    if (this.data.delete) {
      this.user_service.deleteUser(this.data).subscribe((data: any) => {
        if (data.success) {
          this.auth.Notifytoast('success', data.message, 'Success', 3000, 'bottom-right')
          this.passEntry.emit(data.data)
          this.closeModal();
        } else {
          this.auth.Notifytoast('danger', data.message, 'Error', 3000, 'bottom-right')
        }
      });


    } else {
      this.user_service.changeStatus(this.data).subscribe((data: any) => {
        if (data.success) {
          this.auth.Notifytoast('success', data.message, 'Success', 3000, 'bottom-right')
          this.passEntry.emit(data.data)
          this.closeModal();
        } else {
          this.auth.Notifytoast('danger', data.message, 'Error', 3000, 'bottom-right')
        }
      });


    }



  }

  closeModal() {
    this.activeModal.close();
  }


}
