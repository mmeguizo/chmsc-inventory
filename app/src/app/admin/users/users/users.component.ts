import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { AddUserComponent } from '../modals/add-user/add-user.component';
// import { UpdateUserComponent } from '../modals/update-user/update-user.component';
import { NbPopoverDirective } from '@nebular/theme';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/users.service';
import { AddUserComponent } from '../../modals/add-user/add-user.component';



@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  public filterQuery = '';
  public sortBy = 'username';
  public sortOrder = 'asc';
  public selectQueryString = 'Username';
  public selectQuery = 'username';
  loading = true;
  public data = [];
  public socketInstance;



  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild("search", { static: false }) nameField: ElementRef;

  constructor(
    public ngbModal: NgbModal,
    public auth: AuthService,
    public user_service: UserService



  ) {


    this.getAllUsers();


    this.socketInstance = this.auth.replySocket('user').subscribe(emmet => {

      console.log('emmet');
      console.log(emmet);
      this.getAllUsers();
    });

  }

  ngOnInit(): void {
  }



  selectFilter(name, value) {
    this.selectQuery = name;
    this.selectQueryString = value;
    this.popover.hide();
    setTimeout(() => this.nameField.nativeElement.focus(), 0);
    this.filterQuery = "";
  }






  getAllUsers() {
    // Function to GET all blogs from database
    this.user_service.getAllUser().subscribe((data: any) => {

      if (data.success) {
        this.data = data.user
        console.log('this.add ============');
        console.log(this.data);
        this.loading = false;
      } else {
        this.data = [];
        this.loading = false;
      }
    });


  }


  updateUser() {

    console.log(' this to update user');

  }

  addUser() {
    const activeModal = this.ngbModal.open(AddUserComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
  }

  ngOnDestroy() {
    this.socketInstance.unsubscribe();
  }


}
