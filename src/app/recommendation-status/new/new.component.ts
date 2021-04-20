import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecommendationStatus } from 'src/app/models/recommendation-status';
import { ErrorService } from './../../error/error.service';
import { RecommendationStatusService } from './../recommendation-status.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Input() statuses = [];

  loading: boolean = false;
  display: boolean = false;
  status = new RecommendationStatus();

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

  create(form: NgForm): void {
    this.recommendationStatusService.create(this.status)
      .then((result) => {
        this.statuses.push(result);
        this.display = false;
        form.reset();
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
