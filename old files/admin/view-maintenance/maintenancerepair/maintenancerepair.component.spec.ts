import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancerepairComponent } from './maintenancerepair.component';

describe('MaintenancerepairComponent', () => {
  let component: MaintenancerepairComponent;
  let fixture: ComponentFixture<MaintenancerepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancerepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancerepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
