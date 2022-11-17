import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntityLevelService } from 'src/app/entity-level/entity-level.service';
import { EntityLevel } from 'src/app/models/entity-level';
import { EntityFilter } from '../entity-filter-resource';

@Component({
  selector: 'app-entity-filter',
  templateUrl: './entity-filter.component.html',
  styleUrls: ['./entity-filter.component.scss'],
})
export class EntityFilterComponent implements OnInit {
  @Input('entityFilter') filter: EntityFilter;

  @Output('setFilter') filterChange: EventEmitter<EntityFilter> =
    new EventEmitter<EntityFilter>();

  openFilter: boolean = false;

  levels = [];

  constructor(private entityLevelService: EntityLevelService) {}

  ngOnInit(): void {
    this.dropdownLevels();
  }

  dropdownLevels(): void {
    this.entityLevelService.readAll().then(
      (result) =>
        (this.levels = result.map((level: EntityLevel) => ({
          value: level,
          label: level.name,
        })))
    );
  }

  setFilter(): void {
    this.filterChange.emit(this.filter);
  }

  resetFilter(form: NgForm): void {
    form.reset();
  }
}
