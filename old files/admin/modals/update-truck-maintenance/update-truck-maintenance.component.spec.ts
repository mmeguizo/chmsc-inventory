import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTruckMaintenanceComponent } from './update-truck-maintenance.component';

describe('UpdateTruckMaintenanceComponent', () => {
  let component: UpdateTruckMaintenanceComponent;
  let fixture: ComponentFixture<UpdateTruckMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTruckMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTruckMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
