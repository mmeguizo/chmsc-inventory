import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckChecklistComponent } from './truck-checklist.component';

describe('TruckChecklistComponent', () => {
  let component: TruckChecklistComponent;
  let fixture: ComponentFixture<TruckChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
