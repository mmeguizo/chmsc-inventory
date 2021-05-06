import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'ngx-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();

  loading = true;
  public form: any;
  data;
  showpassword = false;
  eyeIcon = "fas fa-eye";
  userData

  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public user: UserService,
    private auth: AuthService,

  ) {

  }



  ngOnInit() {

    this.createForm();
  }


  createForm() {
    this.form = this.formBuilder.group({
      role: [this.userData.role, [Validators.required]],
      username: [this.userData.username, [Validators.required]],
      email: [this.userData.email, [Validators.required]],
      password: [''],
      confirm: [''],
    })
  }


  updateUser(data) {

    data.value._id = this.userData._id

    if (data.value.password === data.value.confirm) {


      this.user.updateUser(data.value).subscribe((data: any) => {

        if (data.success) {
          this.auth.Notifytoast('success', data.message, 'Success', 3000, 'bottom-right')
          this.passEntry.emit(data.data)
          this.closeModal();
          //this.auth.logout()
        } else {
          this.auth.Notifytoast('danger', data.message, 'Error', 3000, 'bottom-right')

        }
      });

    } else {

      this.auth.Notifytoast('danger', 'Password dont match', 'Error', 3000, 'bottom-right')

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
