import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTruckMaintenanceComponent } from './add-truck-maintenance.component';

describe('AddTruckMaintenanceComponent', () => {
  let component: AddTruckMaintenanceComponent;
  let fixture: ComponentFixture<AddTruckMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTruckMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTruckMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
