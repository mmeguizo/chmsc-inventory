import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSSSTableComponent } from './new-ssstable.component';

describe('NewSSSTableComponent', () => {
  let component: NewSSSTableComponent;
  let fixture: ComponentFixture<NewSSSTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSSSTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSSSTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
