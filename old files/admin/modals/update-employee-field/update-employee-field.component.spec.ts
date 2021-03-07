import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeFieldComponent } from './update-employee-field.component';

describe('UpdateEmployeeFieldComponent', () => {
  let component: UpdateEmployeeFieldComponent;
  let fixture: ComponentFixture<UpdateEmployeeFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployeeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
