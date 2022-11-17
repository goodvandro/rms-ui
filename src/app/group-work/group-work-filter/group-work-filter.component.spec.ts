import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupWorkFilterComponent } from './group-work-filter.component';

describe('GroupWorkFilterComponent', () => {
  let component: GroupWorkFilterComponent;
  let fixture: ComponentFixture<GroupWorkFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupWorkFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupWorkFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
