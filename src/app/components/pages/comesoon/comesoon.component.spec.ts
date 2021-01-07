import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComesoonComponent } from './comesoon.component';

describe('ComesoonComponent', () => {
  let component: ComesoonComponent;
  let fixture: ComponentFixture<ComesoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComesoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComesoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
