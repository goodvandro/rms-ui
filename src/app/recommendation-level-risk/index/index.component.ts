import { ErrorService } from './../../error/error.service';
import { RecommendationLevelRiskService } from './../recommendation-level-risk.service';
import { RecommendationLevelRisk } from './../../models/recommendation-level-risk';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  levelsRisk = [];

  constructor(
    private recommendationLevelRiskService: RecommendationLevelRiskService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this.recommendationLevelRiskService.readAll()
      .then((result) => this.levelsRisk = result)
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
