import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrdometerComponent } from './update-ordometer.component';

describe('UpdateOrdometerComponent', () => {
  let component: UpdateOrdometerComponent;
  let fixture: ComponentFixture<UpdateOrdometerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOrdometerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrdometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
