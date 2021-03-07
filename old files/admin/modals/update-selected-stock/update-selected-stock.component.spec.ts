import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSelectedStockComponent } from './update-selected-stock.component';

describe('UpdateSelectedStockComponent', () => {
  let component: UpdateSelectedStockComponent;
  let fixture: ComponentFixture<UpdateSelectedStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSelectedStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSelectedStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
