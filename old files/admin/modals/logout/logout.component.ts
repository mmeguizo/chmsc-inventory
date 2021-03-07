import { Component, OnInit,  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedGlobalService } from '../../../@core/services/shared.global.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReverseDate } from '../../../@core/pipes/dataFilter';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-add-attendance-to-employee',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  public id;
  public fname;
  public form;
  public uid;
  public date;
  public selectedDate;
  public image;
  public emoji;



  constructor(
    public activeModal: NgbActiveModal,
    public sgs: SharedGlobalService,
    public auth: AuthService,

  ) {

  }



  ngOnInit() {

    console.log(this.id);
    console.log(this.fname);
    this.image = 'https://media.giphy.com/media/5xtDarEgBDjEoWo6VRS/giphy.gif'
    this.emoji = this.sgs.connection+ '/avatars/' + 'cat.gif'

  }



logout(){
    this.auth.logout();
}


  closeModal(){
    this.activeModal.close();
  }



  ngOnDestroy(): void {
  }



}
