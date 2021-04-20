import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { RecommendationCharacter } from './../../models/recommendation-character';
import { RecommendationCharacterService } from './../recommendation-character.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  @Input() character: RecommendationCharacter;

  loading: boolean = false;
  display: boolean = false;

  constructor(
    private recommendationCharacterService: RecommendationCharacterService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  showDialog() {
    this.display = true;
  }

  update(): void {
    this.recommendationCharacterService
      .update(this.character.id, this.character)
      .then(() => {
        this.display = false;
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
