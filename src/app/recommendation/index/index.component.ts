import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { RecommendationService } from '../recommendation.service';
import { ErrorService } from './../../error/error.service';
import { RecommendationFilter } from './../recommendation-filter-resource';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  loading: boolean = false;
  openFilter: boolean = false;

  filter: RecommendationFilter = new RecommendationFilter();
  totalRecords: number = 0;
  recommendations = [];

  constructor(
    private recommendationService: RecommendationService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loading = true;
  }

  openFilterDialog(): void {
    this.openFilter = true;
  }

  read(page: number = 0): void {
    if (!this.loading) this.loading = true;

    this.filter.page = page;

    this.recommendationService
      .read(this.filter)
      .then((result) => {
        this.recommendations = result.content;
        this.totalRecords = result.totalElements;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => (this.loading = false));
  }

  lazyLoad(event: LazyLoadEvent) {
    const page = (event.first ?? 0) / (event.rows ?? 1);
    this.filter.sortField = event.sortField || 'id';
    this.filter.sortOrder = event.sortOrder === -1 ? 'asc' : 'desc'; // 1 = ASC, -1 = DESC
    this.filter.rows = event.rows;
    this.read(page);
  }

  setFilter(newFilter: RecommendationFilter): void {
    this.filter = newFilter;
    this.read();
  }
}
