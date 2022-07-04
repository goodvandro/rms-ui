import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntityService } from 'src/app/entity/entity.service';
import { Entity } from 'src/app/models/entity';
import { RecommendationCharacter } from 'src/app/models/recommendation-character';
import { RecommendationLevelRisk } from 'src/app/models/recommendation-level-risk';
import { RecommendationNature } from 'src/app/models/recommendation-nature';
import { RecommendationStatus } from 'src/app/models/recommendation-status';
import { RecommendationCharacterService } from 'src/app/recommendation-character/recommendation-character.service';
import { RecommendationLevelRiskService } from 'src/app/recommendation-level-risk/recommendation-level-risk.service';
import { RecommendationNatureService } from 'src/app/recommendation-nature/recommendation-nature.service';
import { RecommendationStatusService } from 'src/app/recommendation-status/recommendation-status.service';
import { RecommendationFilter } from '../recommendation-filter-resource';
import { DropdownModel } from '../../models/dropdown-model';

@Component({
  selector: 'app-recommendation-filter',
  templateUrl: './recommendation-filter.component.html',
  styleUrls: ['./recommendation-filter.component.scss']
})
export class RecommendationFilterComponent implements OnInit {
  @Input('recommendationFilter') filter: RecommendationFilter;

  @Output('setFilter') filterChange: EventEmitter<RecommendationFilter> = new EventEmitter<RecommendationFilter>();

  openFilter: boolean = false;

  statuses = [];
  natures = [];
  characters = [];
  levelsRisk = [];
  entities = [];

  constructor(
    private entityService: EntityService,
    private statusService: RecommendationStatusService,
    private natureService: RecommendationNatureService,
    private characterService: RecommendationCharacterService,
    private levelRiskService: RecommendationLevelRiskService,
  ) { }

  ngOnInit(): void {
    this.dropdownEntities();
    this.dropdownStatuses();
    this.dropdownNatures();
    this.dropdownCharacters();
    this.dropdownLevelsRisk();
  }

  async dropdownEntities() {
    await this.entityService.readAll()
      .then((result) => {
        this.entities = result.map(
          (entity: Entity): DropdownModel => ({
            value: entity,
            label: entity.name
          }));
      });
  }

  async dropdownStatuses() {
    await this.statusService.readAll()
      .then((result) => {
        this.statuses = result.map(
          (status: RecommendationStatus): DropdownModel => ({
            value: status,
            label: status.name
          }));
      });
  }

  async dropdownNatures() {
    await this.natureService.readAll()
      .then((result) => this.natures = result.map(
        (nature: RecommendationNature): DropdownModel => ({
          value: nature,
          label: nature.name
        })))
  }

  async dropdownCharacters() {
    await this.characterService.readAll()
      .then((result) => this.characters = result.map(
        (character: RecommendationCharacter): DropdownModel => ({
          value: character,
          label: character.name
        })))
  }

  async dropdownLevelsRisk() {
    await this.levelRiskService.readAll()
      .then((result) => this.levelsRisk = result.map(
        (levelRisk: RecommendationLevelRisk): DropdownModel => ({
          value: levelRisk,
          label: levelRisk.name
        })))
  }

  setFilter(): void {
    this.filterChange.emit(this.filter);
  }

  resetFilter(form: NgForm): void {
    form.reset();
  }
}
