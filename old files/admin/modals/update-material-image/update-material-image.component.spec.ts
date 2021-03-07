import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaterialImageComponent } from './update-material-image.component';

describe('UpdateMaterialImageComponent', () => {
  let component: UpdateMaterialImageComponent;
  let fixture: ComponentFixture<UpdateMaterialImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMaterialImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMaterialImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
