import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePayrollComponent } from './create-payroll.component';

describe('CreatePayrollComponent', () => {
  let component: CreatePayrollComponent;
  let fixture: ComponentFixture<CreatePayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
