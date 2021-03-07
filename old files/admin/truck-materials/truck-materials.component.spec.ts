import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckMaterialsComponent } from './truck-materials.component';

describe('TruckMaterialsComponent', () => {
  let component: TruckMaterialsComponent;
  let fixture: ComponentFixture<TruckMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
