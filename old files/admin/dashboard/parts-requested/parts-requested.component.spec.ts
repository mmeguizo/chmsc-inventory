import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsRequestedComponent } from './parts-requested.component';

describe('PartsRequestedComponent', () => {
  let component: PartsRequestedComponent;
  let fixture: ComponentFixture<PartsRequestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsRequestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
