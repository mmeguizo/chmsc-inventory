

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() header;
  @Input() content;
  @Input() okDialog;

  @Output() submit = new EventEmitter();


  constructor(
    public ngbActiveModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.ngbActiveModal.close();
  }
}
