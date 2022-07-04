import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorService } from './../../error/error.service';
import { RecommendationClientFilter, RecommendationClientService } from './../recommendation-client.service';

@Component({
  selector: 'app-client-index',
  templateUrl: './client-index.component.html',
  styleUrls: ['./client-index.component.scss']
})
export class ClientIndexComponent implements OnInit {
  loading: boolean = true;
  filter = new RecommendationClientFilter();
  totalRecords: number = 0;
  recommendations = [];

  constructor(
    private recommendationClientService: RecommendationClientService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
  }

  read(page = 0): void {
    this.filter.page = page;

    this.recommendationClientService.read(this.filter)
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

}
