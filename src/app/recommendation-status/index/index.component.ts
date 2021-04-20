import { Component, OnInit } from '@angular/core';
import { RecommendationStatusService } from '../recommendation-status.service';
import { ErrorService } from './../../error/error.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  statuses = [];

  constructor(
    private recommendationStatusService: RecommendationStatusService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this.recommendationStatusService.readAll()
      .then((result) => this.statuses = result)
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
