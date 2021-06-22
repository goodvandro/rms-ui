import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent } from 'primeng/api';
import { Recommendation } from 'src/app/models/recommendation';
import { ComplianceLevelService } from './../../compliance-level/compliance-level.service';
import { ErrorService } from './../../error/error.service';
import { Compliance } from './../../models/compliance';
import { ComplianceLevel } from './../../models/compliance-level';
import { RecommendationClientFilter, RecommendationClientService } from './../../recommendation/recommendation-client.service';
import { RecommendationService } from './../../recommendation/recommendation.service';
import { ComplianceClientService } from './../compliance-client.service';
import { ComplianceService } from './../compliance.service';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.scss']
})
export class ClientNewComponent implements OnInit {
  loading: boolean = false;
  displayRecommendations: boolean = false;

  compliance = new Compliance();

  filter = new RecommendationClientFilter();
  totalRecords: number = 0;
  recommendations = [];

  levels = [];

  constructor(
    private recommendationService: RecommendationService,
    private recommendationClientService: RecommendationClientService,
    private complianceService: ComplianceService,
    private complianceClientService: ComplianceClientService,
    private complianceLevelService: ComplianceLevelService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dropdownLevels();
  }

  dropdownLevels(): void {
    this.complianceLevelService.readAll()
      .then(result => this.levels = result.map((level: ComplianceLevel) => ({
        value: level,
        label: level.name
      })))
      .catch((error) => this.errorService.handle(error))
  }

  lazyLoad(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.filter.rows = event.rows;
    this.read(page);
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

  getRecommendation(recommendation: Recommendation) {
    this.compliance.recommendation = recommendation;
    this.displayRecommendations = false;
    console.log('compliance: ', this.compliance);
  }

  create(): void {
    this.loading = true;
    console.log('compliance: ', this.compliance);

    this.complianceService.create(this.compliance)
      .then((result) => {
        this.router.navigate(['/compliance/client/show', result.id]);
        this.toastr.success('Cumprimento adicionado adicionada!')
      })
      .catch((error) => {
        this.errorService.handle(error);
        console.log('compliance2: ', this.compliance);
      })
      .finally(() => this.loading = false);
  }
}
