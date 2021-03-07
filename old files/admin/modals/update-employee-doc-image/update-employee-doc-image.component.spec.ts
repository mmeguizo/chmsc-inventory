import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeDocImageComponent } from './update-employee-doc-image.component';

describe('UpdateEmployeeDocImageComponent', () => {
  let component: UpdateEmployeeDocImageComponent;
  let fixture: ComponentFixture<UpdateEmployeeDocImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeDocImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployeeDocImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
