import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { RecommendationCharacter } from './../../models/recommendation-character';
import { RecommendationCharacterService } from './../recommendation-character.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @Input() characters = [];

  loading: boolean = false;
  display: boolean = false;
  character = new RecommendationCharacter();

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

  create(): void {
    this.recommendationCharacterService.create(this.character)
      .then((result) => {
        this.characters.push(result);
        this.display = false;
        this.toastr.success('Informações salvas!');
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
