import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecommendationService } from '../recommendation.service';
import { ErrorService } from './../../error/error.service';
import { Recommendation } from './../../models/recommendation';
import { RecommendationCharacterService } from './../../recommendation-character/recommendation-character.service';
import { RecommendationLevelRiskService } from './../../recommendation-level-risk/recommendation-level-risk.service';
import { RecommendationNatureService } from './../../recommendation-nature/recommendation-nature.service';
import { RecommendationStatusService } from './../../recommendation-status/recommendation-status.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  loading: boolean = false;
  recommendation = new Recommendation();

  statuses = [];
  natures = [];
  characters = [];
  levelsRisk = [];

  constructor(
    private recommendationService: RecommendationService,
    private statusService: RecommendationStatusService,
    private natureService: RecommendationNatureService,
    private characterService: RecommendationCharacterService,
    private levelRiskService: RecommendationLevelRiskService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  dropdownStatuses(): void {
    this.statuses = this.statusService.JSON()
      .map((status) => ({ value: status.id, label: status.name }))
  }

  dropdownNatures(): void {
    this.natures = this.natureService.JSON()
      .map((nature) => ({ value: nature.id, label: nature.name }))
  }

  dropdownCharacters(): void {
    this.characters = this.characterService.JSON()
      .map((character) => ({ value: character.id, label: character.name }))
  }

  dropdownLevelsRisk(): void {
    this.levelsRisk = this.levelRiskService.JSON()
      .map((level) => ({ value: level.id, label: level.name }))
  }
}
