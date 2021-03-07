import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChangeOilComponent } from './update-change-oil.component';

describe('UpdateChangeOilComponent', () => {
  let component: UpdateChangeOilComponent;
  let fixture: ComponentFixture<UpdateChangeOilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChangeOilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChangeOilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
