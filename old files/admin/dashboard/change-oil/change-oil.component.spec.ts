import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOilComponent } from './change-oil.component';

describe('ChangeOilComponent', () => {
  let component: ChangeOilComponent;
  let fixture: ComponentFixture<ChangeOilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeOilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeOilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
