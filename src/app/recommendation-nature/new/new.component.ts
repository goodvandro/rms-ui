import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { RecommendationNature } from './../../models/recommendation-nature';
import { RecommendationNatureService } from './../recommendation-nature.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Input() natures = [];

  loading: boolean = false;
  display: boolean = false;
  nature = new RecommendationNature();

  constructor(
    private recommendationNatureService: RecommendationNatureService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  showDialog() {
    this.display = true;
  }

  create(): void {
    this.recommendationNatureService.create(this.nature)
      .then((result) => {
        this.natures.push(result);
        this.display = false;
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
