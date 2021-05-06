import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RoomsService } from '../../../services/rooms.service';
import { CategoryService } from '../../../services/categories.service';
import { AddRoomComponent } from '../add-room/add-room.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CategoryrResponse } from '../../../services/catergoryResponse';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { InventoryService } from '../../../services/inventory.service';




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
    public inventory_service: InventoryService,
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
      category: new FormControl('', Validators.required),
      // category: ['', [Validators.required]],
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

      } else {
        this.room = [];
        this.loading = false;
      }
    });
  }
  getAllCategory() {
    this.category_service.getAllCategory().subscribe((data: any) => {

      if (data.success) {
        this.category = data.data
        this.loading = false;
        console.log(this.category);
        console.log(typeof this.category);
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
      this.getAllCategory()
      // this.units.push(receivedEntry);
    });

  }

  addInventory(data) {

    console.log(data.value);


    console.log(data.value);
    if (data.value.brand) {
      this.inventory_service.addInventory(data.value).subscribe((data: any) => {
        if (data.success) {
          this.auth.Notifytoast('success', data.message, 'Success', 3000, 'bottom-right')
          this.passEntry.emit(data.room)
          this.closeModal();
        } else {
          this.auth.Notifytoast('danger', data.message, 'Error', 3000, 'bottom-right')
        }
      });
    } else {
      this.auth.Notifytoast('danger', 'No Inventory Supplied', 'Error', 3000, 'bottom-right')
    }

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
