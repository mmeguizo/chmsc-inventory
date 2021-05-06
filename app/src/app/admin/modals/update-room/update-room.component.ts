import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';
import { RoomsService } from '../../../services/rooms.service';


@Component({
  selector: 'ngx-update-user',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.scss']
})
export class UpdateRoomComponent implements OnInit {

  @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();

  loading = true;
  public form: any;
  data;
  showpassword = false;
  eyeIcon = "fas fa-eye";
  roomData

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    private auth: AuthService,
    public room_service: RoomsService,


  ) {

  }



  ngOnInit() {

    this.createForm();
  }


  createForm() {
    this.form = this.formBuilder.group({
      room: [this.roomData.room, [Validators.required]],

    })
  }


  updateRoom(data) {

    data.value._id = this.roomData._id

    if (data.value.room) {

      this.room_service.updateRoom(data.value).subscribe((data: any) => {

        if (data.success) {
          this.auth.Notifytoast('success', data.message, 'Success', 3000, 'bottom-right')
          this.passEntry.emit(data.room)
          this.closeModal();
          //this.auth.logout()
        } else {
          this.auth.Notifytoast('danger', data.message, 'Error', 3000, 'bottom-right')

        }
      });

    } else {
      this.auth.Notifytoast('danger', 'No Room Supplied', 'Error', 3000, 'bottom-right')


    }



  }


  showPassword() {
    if (this.showpassword == true) {
      this.showpassword = false;
      this.eyeIcon = "fa fa-eye";
    } else {
      this.showpassword = true;
      this.eyeIcon = "fa fa-eye-slash";
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
