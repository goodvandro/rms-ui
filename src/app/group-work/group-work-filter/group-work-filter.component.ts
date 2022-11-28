import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupWorkFilter } from '../group-work-filter-resource';

@Component({
  selector: 'app-group-work-filter',
  templateUrl: './group-work-filter.component.html',
  styleUrls: ['./group-work-filter.component.scss'],
})
export class GroupWorkFilterComponent implements OnInit {
  @Input() filter: GroupWorkFilter;

  @Output('setFilter') filterChange: EventEmitter<GroupWorkFilter> =
    new EventEmitter<GroupWorkFilter>();

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
