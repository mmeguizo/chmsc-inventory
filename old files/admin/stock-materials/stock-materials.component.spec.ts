import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMaterialsComponent } from './stock-materials.component';

describe('StockMaterialsComponent', () => {
  let component: StockMaterialsComponent;
  let fixture: ComponentFixture<StockMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
