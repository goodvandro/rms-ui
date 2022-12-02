import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorService } from './../../error/error.service';
import { GroupWorkFilter } from './../group-work-filter-resource';
import { GroupWorkService } from './../group-work.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  filter = new GroupWorkFilter();
  totalRecords: number = 0;
  groupWorks = [];

  constructor(
    private groupService: GroupWorkService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loading = true;
  }

  read(page = 0): void {
    if (!this.loading) this.loading = true;

    this.filter.page = page;

    this.groupService
      .read(this.filter)
      .then((result) => {
        this.groupWorks = result.content
        this.totalRecords = result.totalElements
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => (this.loading = false));
  }

  lazyLoad(event: LazyLoadEvent) {
    console.log(event);

    const page = event.first / event.rows;
    this.filter.rows = event.rows;
    this.filter.sortField = event.sortField;
    this.filter.sortOrder = event.sortOrder;

    this.read(page);
  }

  setFilter(newFilter: GroupWorkFilter): void {
    this.filter = newFilter;
    this.read();
  }
}
