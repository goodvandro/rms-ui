import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ComplianceLevelService } from 'src/app/compliance-level/compliance-level.service';
import { ComplianceLevel } from 'src/app/models/compliance-level';
import { ComplianceFilter } from '../compliance-filter-resource';

@Component({
  selector: 'app-compliance-filter',
  templateUrl: './compliance-filter.component.html',
  styleUrls: ['./compliance-filter.component.scss'],
})
export class ComplianceFilterComponent implements OnInit {
  @Input() filter: ComplianceFilter;

  @Output('setFilter') filterChange: EventEmitter<ComplianceFilter> =
    new EventEmitter<ComplianceFilter>();

  openFilter: boolean = false;

  levels = [];

  constructor(private complianceLevelService: ComplianceLevelService) {}

  ngOnInit(): void {
    this.dropdownLevels();
  }

  dropdownLevels(): void {
    this.complianceLevelService.readAll().then(
      (result) =>
        (this.levels = result.map((level: ComplianceLevel) => ({
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
