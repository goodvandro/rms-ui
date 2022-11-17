import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { RecommendationNatureService } from './../recommendation-nature.service';
import { RecommendationNature } from './../../models/recommendation-nature';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  @Input() nature: RecommendationNature;

  loading: boolean = false;
  display: boolean = false;

  constructor(
    private recommendationNatureService: RecommendationNatureService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  showDialog() {
    this.display = true;
  }

  generateSlug(event: any) {
    const name: string = event.target.value;

    this.nature.slug = name
      .replace(/\s/g, '_')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  update(): void {
    this.recommendationNatureService
      .update(this.nature.id, this.nature)
      .then(() => {
        this.display = false;
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => (this.loading = false));
  }
}
