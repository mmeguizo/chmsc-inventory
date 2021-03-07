import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPayslipComponent } from './print-payslip.component';

describe('PrintPayslipComponent', () => {
  let component: PrintPayslipComponent;
  let fixture: ComponentFixture<PrintPayslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPayslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
