import { RecommendationLevelRisk } from '../models/recommendation-level-risk';
import { RecommendationStatus } from '../models/recommendation-status';
import { RecommendationCharacter } from '../models/recommendation-character';
import { Entity } from '../models/entity';
import { RecommendationNature } from '../models/recommendation-nature';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { User } from '../models/user';

export class RecommendationFilter {
  page: number = 0;
  rows?: number = 10;
  sortField: string;
  sortOrder: string;

  number: string;

  processCode: string;
  description: string;

  entityAudited: Entity;
  status: RecommendationStatus;
  character: RecommendationCharacter;
  levelRisk: RecommendationLevelRisk;
  nature: RecommendationNature;
  userCreated: User;

  amountMin: number;
  amountMax: number;

  createdAt: Date[];
  updatedAt: Date[];
  complianceDeadline: Date[];
}

export const getFilterParams = (filter: RecommendationFilter): HttpParams => {
  let params = new HttpParams();
  params = params.append('page', filter.page.toString());
  params = params.append('size', filter.rows.toString());
  params = params.append('sortField', filter.sortField);
  params = params.append('sortOrder', filter.sortOrder);

  if (filter.number) {
    params = params.append('number', filter.number);
  }

  if (filter.processCode) {
    params = params.append('processCode', filter.processCode);
  }

  if (filter.entityAudited) {
    params = params.append('entityAuditedId', String(filter.entityAudited.id));
  }

  if (filter.status) {
    params = params.append('statusId', String(filter.status.id));
  }

  if (filter.character) {
    params = params.append('characterId', String(filter.character.id));
  }

  if (filter.levelRisk) {
    params = params.append('levelRiskId', String(filter.levelRisk.id));
  }

  if (filter.userCreated) {
    params = params.append('userCreatedId', String(filter.userCreated.id));
  }

  if (filter.nature) {
    params = params.append('natureId', String(filter.nature.id));
  }

  if (filter.amountMin) {
    params = params.append('amountMin', String(filter.amountMin));
  }

  if (filter.amountMax) {
    params = params.append('amountMax', String(filter.amountMax));
  }

  if (filter.createdAt) {
    if (!!filter.createdAt[0])
      params = params.append('createdAtFrom', moment(filter.createdAt[0]).format('YYYY-MM-DD'));
    if (!!filter.createdAt[1])
      params = params.append('createdAtTo', moment(filter.createdAt[1]).format('YYYY-MM-DD'));
  }

  if (filter.updatedAt) {
    if (!!filter.updatedAt[0])
      params = params.append('updatedAtFrom', moment(filter.updatedAt[0]).format('YYYY-MM-DD'));
    if (!!filter.updatedAt[1])
      params = params.append('updatedAtTo', moment(filter.updatedAt[1]).format('YYYY-MM-DD'));
  }

  if (filter.complianceDeadline) {
    if (!!filter.complianceDeadline[0])
      params = params.append('complianceDeadlineFrom', moment(filter.complianceDeadline[0]).format('YYYY-MM-DD'));
    if (!!filter.complianceDeadline[1])
      params = params.append('complianceDeadlineTo', moment(filter.complianceDeadline[1]).format('YYYY-MM-DD'));
  }

  return params;
}
