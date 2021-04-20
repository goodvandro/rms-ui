import { Component, OnInit } from '@angular/core';
import { ErrorService } from './../../error/error.service';
import { RecommendationCharacterService } from './../recommendation-character.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loading: boolean = true;
  characters = [];

  constructor(
    private recommendationCharacterService: RecommendationCharacterService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this.recommendationCharacterService.readAll()
      .then((result) => this.characters = result)
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }
}
