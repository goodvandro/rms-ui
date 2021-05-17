import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecommendationCharacter } from 'src/app/models/recommendation-character';
import { RecommendationLevelRisk } from 'src/app/models/recommendation-level-risk';
import { RecommendationStatus } from 'src/app/models/recommendation-status';
import { RecommendationService } from '../recommendation.service';
import { AuditService } from './../../audit/audit.service';
import { ErrorService } from './../../error/error.service';
import { Audit } from './../../models/audit';
import { Recommendation } from './../../models/recommendation';
import { RecommendationNature } from './../../models/recommendation-nature';
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
  searchingAudit: boolean = false;

  recommendation = new Recommendation();
  audit = new Audit();

  processCode: string;

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
    private auditService: AuditService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dropdownStatuses();
    this.dropdownNatures();
    this.dropdownCharacters();
    this.dropdownLevelsRisk();
  }

  async dropdownStatuses() {
    await this.statusService.readAll()
      .then((result) => this.statuses = result.map(
        (status: RecommendationStatus) => ({
          value: status,
          label: status.name
        })))
  }

  async dropdownNatures() {
    await this.natureService.readAll()
      .then((result) => this.natures = result.map(
        (nature: RecommendationNature) => ({
          value: nature,
          label: nature.name
        })))
  }

  async dropdownCharacters() {
    await this.characterService.readAll()
      .then((result) => this.characters = result.map(
        (character: RecommendationCharacter) => ({
          value: character,
          label: character.name
        })))
  }

  async dropdownLevelsRisk() {
    await this.levelRiskService.readAll()
      .then((result) => this.levelsRisk = result.map(
        (levelRisk: RecommendationLevelRisk) => ({
          value: levelRisk,
          label: levelRisk.name
        })))
  }

  getAuditByProcessCode(event: any): void {
    const processCode = event.target.value;

    if (processCode.length === 11) {
      this.searchingAudit = true;
      this.auditService.getByProcessCode(processCode)
        .then((result: Audit) => {
          this.audit = result;
        })
        .catch((error) => {
          if (error.code === 404)
            this.toastr.error('Número de processo inexistente, tente de novo!');
          else this.errorService.handle(error)
        })
        .finally(() => this.searchingAudit = false)
    } else {
      this.audit = new Audit();
      this.searchingAudit = false;
    }
  }

  create(): void {
    this.loading = true;
    this.recommendation.audit.id = this.audit.id;
    this.recommendationService.create(this.recommendation)
      .then((result) => {
        this.router.navigate(['/recommendation/show', result.id]);
        this.toastr.success('Recomendação adicionado!')
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
