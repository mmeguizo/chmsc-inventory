import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPayslipComponent } from './my-payslip.component';

describe('MyPayslipComponent', () => {
  let component: MyPayslipComponent;
  let fixture: ComponentFixture<MyPayslipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPayslipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
