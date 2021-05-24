import { RecommendationFilter, RecommendationService } from './../../recommendation/recommendation.service';
import { LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Recommendation } from 'src/app/models/recommendation';
import { ComplianceService } from '../compliance.service';
import { ComplianceLevelService } from './../../compliance-level/compliance-level.service';
import { ErrorService } from './../../error/error.service';
import { Compliance } from './../../models/compliance';
import { ComplianceLevel } from './../../models/compliance-level';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  loading: boolean = false;
  displayRecommendations: boolean = false;

  compliance = new Compliance();

  filter = new RecommendationFilter();
  totalRecords: number = 0;
  recommendations = [];

  levels = [];

  constructor(
    private complianceService: ComplianceService,
    private complianceLevelService: ComplianceLevelService,
    private recommendationService: RecommendationService,
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

    this.recommendationService.read(this.filter)
      .then((result) => {
        console.log(result);
        this.recommendations = result.content;
        this.totalRecords = result.totalElements;
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false);
  }

  getRecommendation(recommendation: Recommendation) {
    this.compliance.recommendation = recommendation;
    this.displayRecommendations = false;
  }

  create(): void {
    this.loading = true;
    delete this.compliance.recommendation.audit.processCode;
    this.complianceService.create(this.compliance)
      .then((result) => {
        this.router.navigate(['/compliance/show', result.id]);
        this.toastr.success('Cumprimento adicionado adicionada!')
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
