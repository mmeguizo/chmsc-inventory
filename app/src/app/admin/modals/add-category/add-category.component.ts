import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RoomsService } from '../../../services/rooms.service';
import { CategoryService } from '../../../services/categories.service';

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


  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public CategoryService: CategoryService,
    private auth: AuthService,

  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      category: ['', [Validators.required]],
    })
  }

  ngOnInit() {
  }

  addCategory(data) {

    if (data.value.category) {
      this.CategoryService.addCategory(data.value).subscribe((data: any) => {
        if (data.success) {
          this.auth.Notifytoast('success', data.message, 'Success', 3000, 'bottom-right')
          this.passEntry.emit(data.category)
          this.closeModal();
        } else {
          this.auth.Notifytoast('danger', data.message, 'Error', 3000, 'bottom-right')
        }
      });
    } else {
      this.auth.Notifytoast('danger', 'No Room Supplied', 'Error', 3000, 'bottom-right')
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
