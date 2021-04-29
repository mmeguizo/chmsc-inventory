import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RoomsService } from '../../../services/rooms.service';
import { CategoryService } from '../../../services/categories.service';
import { AddRoomComponent } from '../add-room/add-room.component';
import { AddCategoryComponent } from '../add-category/add-category.component';




@Component({
  selector: 'ngx-add-room',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

  @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();

  loading = true;
  public form: any;
  data;
  room: any;
  category = [];

  constructor(
    public activeModal: NgbActiveModal,
    public ngbModal: NgbModal,
    public formBuilder: FormBuilder,
    public room_service: RoomsService,
    private auth: AuthService,
    private category_service: CategoryService,

  ) {
    this.createForm();
  }


  ngOnInit() {
    this.getAllCategory();
    this.getAllRoom();


  }


  createForm() {
    this.form = this.formBuilder.group({
      category: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      serial: ['', [Validators.required]],
      description: ['', [Validators.required]],
      room: ['', [Validators.required]],
    })
  }



  getAllRoom() {
    // Function to GET all blogs from database
    this.room_service.getAllRoom().subscribe((data: any) => {
      if (data.success) {
        this.room = data.room
        this.loading = false;
        console.log(this.room);

      } else {
        this.room = [];
        this.loading = false;
      }
    });
  }
  getAllCategory() {
    // Function to GET all blogs from database
    this.category_service.getAllCategory().subscribe((data: any) => {

      if (data.success) {
        this.category = data.category;
        this.loading = false;
        console.log(this.category);
      } else {
        this.category = [];
        this.loading = false;
      }


    });
  }


  addRoom() {
    const activeModal = this.ngbModal.open(AddRoomComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.getAllRoom()
      // this.units.push(receivedEntry);
    });

  }
  addCategory() {
    const activeModal = this.ngbModal.open(AddCategoryComponent, { size: 'sm', container: 'nb-layout', windowClass: 'min_height', backdrop: 'static' });
    activeModal.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.getAllRoom()
      // this.units.push(receivedEntry);
    });

  }

  addInventory(data) {

    console.log(data.value);


    // console.log(data.value);
    // if (data.value.room) {
    //   this.room_service.addRoom(data.value).subscribe((data: any) => {
    //     if (data.success) {
    //       this.auth.Notifytoast('success', data.message, 'Success', 3000, 'bottom-right')
    //       this.passEntry.emit(data.room)
    //       this.closeModal();
    //     } else {
    //       this.auth.Notifytoast('danger', data.message, 'Error', 3000, 'bottom-right')
    //     }
    //   });
    // } else {
    //   this.auth.Notifytoast('danger', 'No Room Supplied', 'Error', 3000, 'bottom-right')
    // }

  }

  addNewRoom(event) {
    console.log(event);
    event === "addNewRoom" ? this.addRoom() :
      this.form.controls['room'].patchValue(event);
  }
  addNewCategory(event) {
    console.log(event);
    event === "addNewCategory" ? this.addCategory() : 'tester'
    // this.form.controls['category'].patchValue(event);
  }

  closeModal() {
    this.activeModal.close();
  }

}
