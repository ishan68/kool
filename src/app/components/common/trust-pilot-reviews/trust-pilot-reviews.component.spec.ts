import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustPilotReviewsComponent } from './trust-pilot-reviews.component';

describe('TrustPilotReviewsComponent', () => {
  let component: TrustPilotReviewsComponent;
  let fixture: ComponentFixture<TrustPilotReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustPilotReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustPilotReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
