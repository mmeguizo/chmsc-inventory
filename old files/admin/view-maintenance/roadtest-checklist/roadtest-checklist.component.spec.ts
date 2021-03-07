import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadtestChecklistComponent } from './roadtest-checklist.component';

describe('RoadtestChecklistComponent', () => {
  let component: RoadtestChecklistComponent;
  let fixture: ComponentFixture<RoadtestChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadtestChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadtestChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
