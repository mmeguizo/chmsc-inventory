import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTruckFileComponent } from './update-truck-file.component';

describe('UpdateTruckFileComponent', () => {
  let component: UpdateTruckFileComponent;
  let fixture: ComponentFixture<UpdateTruckFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTruckFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTruckFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
