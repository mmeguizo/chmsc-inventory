import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaxTableComponent } from './new-taxtable.component';

describe('NewTaxComponent', () => {
  let component: NewTaxTableComponent;
  let fixture: ComponentFixture<NewTaxTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaxTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
