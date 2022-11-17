import { RecommendationLevelRisk } from './../../models/recommendation-level-risk';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { RecommendationLevelRiskService } from './../recommendation-level-risk.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() levelsRisk = [];

  loading: boolean = false;
  display: boolean = false;
  levelRisk = new RecommendationLevelRisk();

  constructor(
    private recommendationLevelRiskService: RecommendationLevelRiskService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  showDialog() {
    this.display = true;
  }

  generateSlug(event: any) {
    const name: string = event.target.value;

    this.levelRisk.slug = name
      .replace(/\s/g, '_')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  create(form: NgForm): void {
    this.recommendationLevelRiskService
      .create(this.levelRisk)
      .then((result) => {
        this.levelsRisk.push(result);
        this.display = false;
        form.reset();
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => (this.loading = false));
  }
}
