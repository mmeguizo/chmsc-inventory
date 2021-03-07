import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgentProfileComponent } from './view-agent-profile.component';

describe('ViewAgentProfileComponent', () => {
  let component: ViewAgentProfileComponent;
  let fixture: ComponentFixture<ViewAgentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAgentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
