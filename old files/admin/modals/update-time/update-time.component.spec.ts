import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTImeComponent } from './update-time.component';

describe('UpdateTImeComponent', () => {
  let component: UpdateTImeComponent;
  let fixture: ComponentFixture<UpdateTImeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTImeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTImeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
