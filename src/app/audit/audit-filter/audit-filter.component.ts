import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuditStatusService } from 'src/app/audit-status/audit-status.service';
import { AuditTypeService } from 'src/app/audit-type/audit-type.service';
import { EntityService } from 'src/app/entity/entity.service';
import { GroupWorkService } from 'src/app/group-work/group-work.service';
import { AuditStatus } from 'src/app/models/audit-status';
import { AuditType } from 'src/app/models/audit-type';
import { DropdownModel } from 'src/app/models/dropdown-model';
import { Entity } from 'src/app/models/entity';
import { GroupWork } from 'src/app/models/group-work';
import { AuditFilter } from '../audit.filter.resource';

@Component({
  selector: 'app-audit-filter',
  templateUrl: './audit-filter.component.html',
  styleUrls: ['./audit-filter.component.scss']
})
export class AuditFilterComponent implements OnInit {
  @Input('auditFilter') filter: AuditFilter;
  @Output('setFilter') filterChange: EventEmitter<AuditFilter> = new EventEmitter<AuditFilter>();

  openFilter: boolean = false;

  statuses = [];
  types = [];
  groupsWork = [];
  levelsRisk = [];
  entities = [];

  minYearFilter: number = 2015;
  maxYearFilter = new Date().getFullYear();
  yearsFilter = [];

  constructor(
    private entityService: EntityService,
    private auditStatusService: AuditStatusService,
    private auditTypeService: AuditTypeService,
    private groupWorkService: GroupWorkService,
  ) { }

  ngOnInit(): void {
    this.dropdownYearsFilter();
    this.dropdownEntities();
    this.dropdownStatuses();
    this.dropdownTypes();
    this.dropdownGroupsWork();
  }

  dropdownYearsFilter() {
    let year: number = this.minYearFilter;

    while (year <= this.maxYearFilter) {
      this.yearsFilter.push({
        label: year.toString(),
        value: year.toString().substring(1)
      });

      year++;
    }

    this.yearsFilter.reverse();
  }

  async dropdownEntities(): Promise<any> {
    await this.entityService.readAll()
      .then((result) => {
        this.entities = result.map(
          (entity: Entity): DropdownModel => ({
            value: entity,
            label: entity.name
          }));
      });
  }

  async dropdownStatuses() {
    await this.auditStatusService.readAll()
      .then((result) => {
        this.statuses = result.map(
          (status: AuditStatus): DropdownModel => ({
            value: status,
            label: status.name
          }));
      });
  }

  async dropdownTypes() {
    await this.auditTypeService.readAll()
      .then((result) => this.types = result.map(
        (type: AuditType): DropdownModel => ({
          value: type,
          label: type.name
        })))
  }

  async dropdownGroupsWork() {
    await this.groupWorkService.readAll()
      .then((result) => this.groupsWork = result.map(
        (groupWork: GroupWork): DropdownModel => ({
          value: groupWork,
          label: groupWork.name
        })))
  }

  setFilter(): void {
    this.filterChange.emit(this.filter);
  }

  resetFilter(form: NgForm): void {
    form.reset();
  }
}
