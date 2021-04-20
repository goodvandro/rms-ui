import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { RecommendationLevelRiskService } from './../recommendation-level-risk.service';
import { Component, OnInit, Input } from '@angular/core';
import { RecommendationLevelRisk } from 'src/app/models/recommendation-level-risk';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  @Input() levelRisk: RecommendationLevelRisk;

  loading: boolean = false;
  display: boolean = false;

  constructor(
    private recommendationLevelRiskService: RecommendationLevelRiskService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  showDialog() {
    this.display = true;
  }

  update(): void {
    this.recommendationLevelRiskService.update(this.levelRisk.id, this.levelRisk)
      .then(() => {
        this.display = false;
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
