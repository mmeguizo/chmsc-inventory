import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';




@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();

  loading = true;
  public form: any;
  data;
  showpassword = false;
  eyeIcon = "fas fa-eye";


  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public user: UserService,
    private auth: AuthService,

  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      role: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
    })
  }

  ngOnInit() {
  }



  addUser(data) {


    console.log(data.value);


    if (data.value.password === data.value.confirm) {


      this.user.addUser(data.value).subscribe((data: any) => {

        if (data.success) {
          this.auth.Notifytoast('success', data.message, 'Success', 3000, 'bottom-right')
          this.passEntry.emit(data.data)
          this.closeModal();
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
