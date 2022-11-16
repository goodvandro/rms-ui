import { LazyLoadEvent } from 'primeng/api';
import { ErrorService } from './../../error/error.service';
import { EntityService } from './../entity.service';
import { EntityFilter } from './../entity-filter-resource';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  loading: boolean;
  filter = new EntityFilter();
  totalRecords: number = 0;
  entities = [];

  constructor(
    private entityService: EntityService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loading = true;
  }

  read(page = 0): void {
    if (!this.loading) this.loading = true;

    this.filter.page = page;

    this.entityService
      .read(this.filter)
      .then((result) => {
        this.entities = result.content;
        this.totalRecords = result.totalElements;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => (this.loading = false));
  }

  lazyLoad(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.filter.rows = event.rows;
    this.read(page);
  }

  setFilter(newFilter: EntityFilter): void {
    this.filter = newFilter;
    this.read();
  }
}
