import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalCardComponent } from './renewal-card.component';

describe('RenewalCardComponent', () => {
  let component: RenewalCardComponent;
  let fixture: ComponentFixture<RenewalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
