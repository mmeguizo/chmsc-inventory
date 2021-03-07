import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPITableComponent } from './new-pitable.component';

describe('NewPITableComponent', () => {
  let component: NewPITableComponent;
  let fixture: ComponentFixture<NewPITableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPITableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPITableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
