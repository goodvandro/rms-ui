import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationFilterComponent } from './recommendation-filter.component';

describe('RecommendationFilterComponent', () => {
  let component: RecommendationFilterComponent;
  let fixture: ComponentFixture<RecommendationFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
