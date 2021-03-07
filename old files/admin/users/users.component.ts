import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedGlobalService } from '../../@core/services/shared.global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../modals/add-user/add-user.component';
import { UpdateUserComponent } from '../modals/update-user/update-user.component';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  bsValue = new Date();
  data;
  loading = true;
  date = new Date();
  todate;
  public socketInstance;
  me;
  public filterQuery = '';
  public sortBy = 'id';
  public sortOrder = 'asc';
  public selectQueryString = 'ID';
  public selectQuery = 'id';
  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild("search", {static: false}) nameField: ElementRef;

  constructor(
    public sgs: SharedGlobalService,
    public ngbModal: NgbModal
  ) {
    this.socketInstance = sgs.ResponseSocket('users').subscribe( emitted => {
      this.getAllUsers();
    });
   }

  ngOnInit() {
    this.getAllUsers();
  }

  ngOnDestroy(){
    this.socketInstance.unsubscribe();
  }

  selectFilter(name, value){
    this.selectQuery = name;
    this.selectQueryString = value;
    this.popover.hide();
    setTimeout(() => this.nameField.nativeElement.focus(), 0);
    this.filterQuery = "";
  }

  getAllUsers(){
    this.sgs.request('get', 'user/getAllUsers', null, async (response) => {
      if( response.success ){
       this.data = response.data;
       this.loading = false;
      }else{
      }
    },{cache:true, describe: "Error getting users!" });
  }

  addUser(){
    const activeModal = this.ngbModal.open(AddUserComponent, { size: 'lg', container: 'nb-layout', windowClass: 'min_height' });
  }

  disableAccount(id){
    this.sgs.Modal({
      header: `System Message`,
      content: `
        Are you sure you want to disable this user?
      `,
      type: 'confirmation',
      buttonName: 'close'
    }, { size: 'sm'})
    .confirm.subscribe( response => {
      if( response ){
        this.sgs.request('post', 'user/deactivateUser', {id: id}, async (res) => {
          if(res.success){
            this.getAllUsers();
            this.sgs.Toaster('success', 'Success', 'The user has been disabled.');
          }
        });
      }
    });
  }

  enableAccount(id){
    this.sgs.Modal({
      header: `System Message`,
      content: `
        Are you sure you want to enabable this user?
      `,
      type: 'confirmation',
      buttonName: 'close'
    }, { size: 'sm'})
    .confirm.subscribe( response => {
      if( response ){
        this.sgs.request('post', 'user/enableUser', {id: id}, async (res) => {
          if(res.success){
            this.getAllUsers();
            this.sgs.Toaster('success', 'Success', 'The user has been enabled.');
          }
        });
      }
    });
  }

  updateUser(data){
    this.sgs.Modal(
      {uid : data},
      {
        component : UpdateUserComponent, size : 'lg'
      }
    )
  }
}
