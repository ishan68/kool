import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdprsComponent } from './gdprs.component';

describe('GdprsComponent', () => {
  let component: GdprsComponent;
  let fixture: ComponentFixture<GdprsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdprsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdprsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
