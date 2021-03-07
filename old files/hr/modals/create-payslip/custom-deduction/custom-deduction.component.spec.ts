import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDeductionComponent } from './custom-deduction.component';

describe('CustomDeductionComponent', () => {
  let component: CustomDeductionComponent;
  let fixture: ComponentFixture<CustomDeductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDeductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
