import { Component, OnInit } from '@angular/core';
import { RecommendationNatureService } from '../recommendation-nature.service';
import { ErrorService } from './../../error/error.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  natures = [];

  constructor(
    private recommendationNatureService: RecommendationNatureService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this.recommendationNatureService.readAll()
      .then((result) => this.natures = result)
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
