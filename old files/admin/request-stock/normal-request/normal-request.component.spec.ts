import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalRequestComponent } from './normal-request.component';

describe('NormalRequestComponent', () => {
  let component: NormalRequestComponent;
  let fixture: ComponentFixture<NormalRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
