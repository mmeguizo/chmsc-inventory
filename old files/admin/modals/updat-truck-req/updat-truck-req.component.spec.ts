import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatTruckReqComponent } from './updat-truck-req.component';

describe('UpdatTruckReqComponent', () => {
  let component: UpdatTruckReqComponent;
  let fixture: ComponentFixture<UpdatTruckReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatTruckReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatTruckReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
