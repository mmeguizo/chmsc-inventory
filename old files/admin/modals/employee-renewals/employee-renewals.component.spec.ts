import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRenewalsComponent } from './employee-renewals.component';

describe('EmployeeRenewalsComponent', () => {
  let component: EmployeeRenewalsComponent;
  let fixture: ComponentFixture<EmployeeRenewalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRenewalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRenewalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
