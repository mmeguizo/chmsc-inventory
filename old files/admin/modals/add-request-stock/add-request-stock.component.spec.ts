import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestStockComponent } from './add-request-stock.component';

describe('AddRequestStockComponent', () => {
  let component: AddRequestStockComponent;
  let fixture: ComponentFixture<AddRequestStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRequestStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
