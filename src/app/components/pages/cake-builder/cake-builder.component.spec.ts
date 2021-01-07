import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeBuilderComponent } from './cake-builder.component';

describe('CakeBuilderComponent', () => {
  let component: CakeBuilderComponent;
  let fixture: ComponentFixture<CakeBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
