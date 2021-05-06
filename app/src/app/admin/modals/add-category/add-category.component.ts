import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RoomsService } from '../../../services/rooms.service';
import { CategoryService } from '../../../services/categories.service';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';

var _ = require('lodash');

@Component({
  selector: 'ngx-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {


  @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();

  loading = true;
  public form: any;
  data;

  public category = []

  constructor(
    public activeModal: NgbActiveModal,
    public ngbModal: NgbModal,
    public formBuilder: FormBuilder,
    public categoryService: CategoryService,
    private auth: AuthService,

  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      category: ['', [Validators.required]],
    })
  }

  ngOnInit() {

    this.getAllCategory()

  }



  getAllCategory() {


    this.categoryService.getAllCategory().subscribe((data: any) => {

      if (data.success) {
        this.category = data.data
        this.loading = false;
        console.log(this.category);


      } else {
        this.category = [];
        this.loading = false;
      }
    });
  }

  edit(data) {


    console.log(data);

    this.form.patchValue({
      id: data.id,
      category: data.category_name,
    });



  }

  deletes(category) {
    const activeModal = this.ngbModal.open(ConfirmationModalComponent, { size: 'sm', backdrop: false });
    activeModal.componentInstance.header = 'Remove Category ' + category.category_name.charAt(0).toUpperCase() + category.category_name.slice(1);
    activeModal.componentInstance.content = 'Are you sure you want to remove?';

    activeModal.componentInstance.submit.subscribe(res => {
      activeModal.close();
      this.categoryService.deleteCategory({ id: category.id }).subscribe((data: any) => {
        if (data.success) {
          this.auth.Notifytoast('success', 'Done', 'Success Deleting', 3000, 'bottom-right')
          this.passEntry.emit(data.data);
          this.getAllCategory();
        } else {
          this.auth.Notifytoast('danger', 'Oops', 'Error Deleting', 3000, 'bottom-right')
        }
      });
    });
  }



  save(form) {

    console.log(form.value);


    if (!form.value.id) {

      if (form.value.category) {


        this.categoryService.addCategory({ category: form.value.category }).subscribe((data: any) => {
          if (data.success) {
            this.auth.Notifytoast('success', data.message, 'Success', 3000, 'bottom-right')
            this.passEntry.emit(data.category);
            this.getAllCategory()
            this.form.reset();
          } else {
            this.auth.Notifytoast('danger', data.message, 'Error', 3000, 'bottom-right')
          }
        });

      } else {
        this.auth.Notifytoast('danger', 'No Category Supplied', 'Error', 3000, 'bottom-right')
      }



    } else {


      if (form.value.category) {

        this.categoryService.updateCategory({ category: form.value }).subscribe((data: any) => {
          if (data.success) {
            this.auth.Notifytoast('success', "Update Done", 'Success', 3000, 'bottom-right')
            this.passEntry.emit(data.category);
            this.getAllCategory()
            this.form.reset();
          } else {
            this.auth.Notifytoast('danger', data.message, 'Error', 3000, 'bottom-right')
          }
        });

      } else {
        this.auth.Notifytoast('danger', 'No Category Supplied', 'Error', 3000, 'bottom-right')
      }

    }

  }


  closeModal() {
    this.activeModal.close();
  }

}
