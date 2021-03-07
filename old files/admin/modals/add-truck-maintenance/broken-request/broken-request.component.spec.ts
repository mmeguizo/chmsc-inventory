import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokenRequestComponent } from './broken-request.component';

describe('BrokenRequestComponent', () => {
  let component: BrokenRequestComponent;
  let fixture: ComponentFixture<BrokenRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokenRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokenRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
