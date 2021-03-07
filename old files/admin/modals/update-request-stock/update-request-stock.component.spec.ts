import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestStockComponent } from './update-request-stock.component';

describe('UpdateRequestStockComponent', () => {
  let component: UpdateRequestStockComponent;
  let fixture: ComponentFixture<UpdateRequestStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRequestStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequestStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
