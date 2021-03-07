import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSelectedRequestComponent } from './update-selected-request.component';

describe('UpdateSelectedRequestComponent', () => {
  let component: UpdateSelectedRequestComponent;
  let fixture: ComponentFixture<UpdateSelectedRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSelectedRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSelectedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
