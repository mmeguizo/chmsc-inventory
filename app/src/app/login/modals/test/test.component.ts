import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @Input() title: String;

  constructor(protected ref: NbDialogRef<TestComponent>) {}

  ngOnInit(): void {
  }

  dismiss() {
    this.ref.close();
  }
  
}

