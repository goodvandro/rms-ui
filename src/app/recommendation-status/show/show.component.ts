import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RecommendationStatus } from 'src/app/models/recommendation-status';
import { ErrorService } from './../../error/error.service';
import { RecommendationStatusService } from './../recommendation-status.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  @Input() status: RecommendationStatus;

  loading: boolean = false;
  display: boolean = false;

  constructor(
    private recommendationStatusService: RecommendationStatusService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  showDialog() {
    this.display = true;
  }

  update(): void {
    this.recommendationStatusService.update(this.status.id, this.status)
      .then(() => {
        this.display = false;
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
