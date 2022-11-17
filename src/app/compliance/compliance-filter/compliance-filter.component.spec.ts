import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceFilterComponent } from './compliance-filter.component';

describe('ComplianceFilterComponent', () => {
  let component: ComplianceFilterComponent;
  let fixture: ComponentFixture<ComplianceFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
