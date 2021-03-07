import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeductionsComponent } from './add-deductions.component';

describe('AddDeductionsComponent', () => {
  let component: AddDeductionsComponent;
  let fixture: ComponentFixture<AddDeductionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeductionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
