import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomplishmentFormComponent } from './accomplishment-form.component';

describe('AccomplishmentFormComponent', () => {
  let component: AccomplishmentFormComponent;
  let fixture: ComponentFixture<AccomplishmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomplishmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomplishmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
