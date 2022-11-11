import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddressFilter } from '../address-filter-resource';

@Component({
  selector: 'app-address-filter',
  templateUrl: './address-filter.component.html',
  styleUrls: ['./address-filter.component.scss'],
})
export class AddressFilterComponent implements OnInit {
  @Input('addressFilter') filter: AddressFilter;

  @Output('setFilter') filterChange: EventEmitter<AddressFilter> =
    new EventEmitter<AddressFilter>();

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
