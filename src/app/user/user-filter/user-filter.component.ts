import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntityService } from 'src/app/entity/entity.service';
import { GroupService } from 'src/app/group/group.service';
import { DropdownModel } from 'src/app/models/dropdown-model';
import { Entity } from 'src/app/models/entity';
import { Group } from 'src/app/models/group';
import { UserFilter } from '../user-filter-resource';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
})
export class UserFilterComponent implements OnInit {
  @Input('userFilter') filter: UserFilter;

  @Output('setFilter') filterChange: EventEmitter<UserFilter> =
    new EventEmitter<UserFilter>();

  openFilter: boolean = false;

  entities = [];
  groups = [];

  constructor(
    private entityService: EntityService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.dropdownEntities();
    this.dropdownGroups();
  }

  async dropdownEntities() {
    await this.entityService.readAll().then((result) => {
      this.entities = result.map(
        (entity: Entity): DropdownModel => ({
          value: entity,
          label: entity.name,
        })
      );
    });
  }

  async dropdownGroups() {
    await this.groupService.readAll().then(async (result) => {
      this.groups = await result.map(
        (group: Group): DropdownModel => ({
          value: group,
          label: group.name,
        })
      );
    });
  }

  setFilter(): void {
    console.log(this.filter);
    this.filterChange.emit(this.filter);
  }

  resetFilter(form: NgForm): void {
    form.reset();
  }
}
