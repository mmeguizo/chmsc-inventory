import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPhilHealthTableComponent } from './new-phil-health-table.component';

describe('NewPhilHealthTableComponent', () => {
  let component: NewPhilHealthTableComponent;
  let fixture: ComponentFixture<NewPhilHealthTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPhilHealthTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPhilHealthTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
