import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokenMaterialRequestComponent } from './broken-material-request.component';

describe('BrokenMaterialRequestComponent', () => {
  let component: BrokenMaterialRequestComponent;
  let fixture: ComponentFixture<BrokenMaterialRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokenMaterialRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokenMaterialRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
