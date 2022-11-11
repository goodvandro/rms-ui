import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupFilter } from '../group.service';

@Component({
  selector: 'app-group-filter',
  templateUrl: './group-filter.component.html',
  styleUrls: ['./group-filter.component.scss'],
})
export class GroupFilterComponent implements OnInit {
  @Input('groupFilter') filter: GroupFilter;

  @Output('setFilter') filterChange: EventEmitter<GroupFilter> =
    new EventEmitter();

  openFilter: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  setFilter(): void {
    this.filterChange.emit(this.filter);
  }

  resetFilter(form: NgForm): void {
    form.reset();
  }
}
