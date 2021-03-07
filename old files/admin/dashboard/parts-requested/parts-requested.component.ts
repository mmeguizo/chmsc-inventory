import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-parts-requested',
  templateUrl: './parts-requested.component.html',
  styleUrls: ['./parts-requested.component.scss']
})
export class PartsRequestedComponent implements OnInit {
@Input() data : any[]
  constructor() { }

  ngOnInit(): void {

  }

}
