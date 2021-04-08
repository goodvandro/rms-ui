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
  filter = new RecommendationFilter();
  totalRecords: number = 0;
  audits = [];

  constructor(
    private recommendationService: RecommendationService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.audits = this.recommendationService.JSON();
  }

  read(page = 0): void {
    this.filter.page = page;

    this.recommendationService.read(this.filter)
      .then((result) => {
        this.audits = result.content;
        this.totalRecords = result.totalRecords;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }

  onLazyLoad(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.read(page);
  }
}
