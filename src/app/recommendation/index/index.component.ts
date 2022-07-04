import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { RecommendationService } from '../recommendation.service';
import { ErrorService } from './../../error/error.service';
import { RecommendationFilter } from './../recommendation.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  openFilter: boolean = false;

  filter: RecommendationFilter = new RecommendationFilter();
  totalRecords: number = 0;
  recommendations = [];

  constructor(
    private recommendationService: RecommendationService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
  }

  openFilterDialog(): void {
    this.openFilter = true;
  }

  read(page = 0): void {
    this.filter.page = page;

    this.recommendationService.read(this.filter)
      .then((result) => {
        this.recommendations = result.content;
        this.totalRecords = result.totalElements;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }

  lazyLoad(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.filter.rows = event.rows;
    this.read(page);
  }

  setFilter(newFilter: RecommendationFilter): void {
    this.filter = newFilter;
    this.read();
  }
}
