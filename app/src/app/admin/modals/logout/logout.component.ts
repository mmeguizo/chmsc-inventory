import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'ngx-logout',
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
    public auth: AuthService,

  ) {

    this.image = 'https://media.giphy.com/media/5xtDarEgBDjEoWo6VRS/giphy.gif'
    this.emoji = this.auth.domain + '/avatars/' + 'cat.gif'



  }

  ngOnInit(): void {
  }


  logout() {
    this.auth.logout();
  }

  closeModal() {
    this.activeModal.close();
  }


}
