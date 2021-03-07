import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendanceToEmployeeComponent } from './add-attendance-to-employee.component';

describe('AddAttendanceToEmployeeComponent', () => {
  let component: AddAttendanceToEmployeeComponent;
  let fixture: ComponentFixture<AddAttendanceToEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttendanceToEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttendanceToEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
