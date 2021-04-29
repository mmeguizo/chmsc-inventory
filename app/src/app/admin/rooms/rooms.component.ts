

import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { AddUserComponent } from '../modals/add-user/add-user.component';
// import { UpdateUserComponent } from '../modals/update-user/update-user.component';
import { NbPopoverDirective } from '@nebular/theme';
import { AuthService } from '../../services/auth.service';
import { AddUserComponent } from '../modals/add-user/add-user.component';
import { ConfimationComponent } from '../modals/confimation/confimation.component';
import { RoomsService } from '../../services/rooms.service';
import { AddRoomComponent } from '../modals/add-room/add-room.component';
import { UpdateRoomComponent } from '../modals/update-room/update-room.component';


@Component({
  selector: 'ngx-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();

  public filterQuery = '';
  public sortBy = 'room';
  public sortOrder = 'asc';
  public selectQueryString = 'Room';
  public selectQuery = 'room';
  loading = true;
  public room = [];
  public socketInstance;



  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild("search", { static: false }) nameField: ElementRef;

  constructor(
    public ngbModal: NgbModal,
    public auth: AuthService,
    public room_service: RoomsService

  ) {

    this.getAllRoom();

  }

  ngOnInit(): void {

    this.getAllRoom();

  }



  selectFilter(name, value) {
    this.selectQuery = name;
    this.selectQueryString = value;
    this.popover.hide();
    setTimeout(() => this.nameField.nativeElement.focus(), 0);
    this.filterQuery = "";
  }






  getAllRoom() {
    // Function to GET all blogs from database
    this.room_service.getAllRoom().subscribe((data: any) => {
      if (data.success) {
        this.room = data.room
        this.loading = false;
      } else {
        this.room = [];
        this.loading = false;
      }
    });
  }


  updateRoom(room) {

    const activeModal = this.ngbModal.open(UpdateRoomComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.roomData = room;
    activeModal.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.getAllRoom()
      // this.units.push(receivedEntry);
    });


  }

  addRoom() {
    const activeModal = this.ngbModal.open(AddRoomComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.getAllRoom()
      // this.units.push(receivedEntry);
    });

  }

  ngOnDestroy() {
    // this.socketInstance.unsubscribe();
  }


  changeRoomStatus(room) {

    const activeModal = this.ngbModal.open(ConfimationComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.room = room;
    activeModal.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.getAllRoom()
      // this.units.push(receivedEntry);
    });

  }
  deleteRoom(room) {
    room.delete = true;
    const activeModal = this.ngbModal.open(ConfimationComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.room = room;
    activeModal.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.getAllRoom()
      // this.units.push(receivedEntry);
    });

  }


}
