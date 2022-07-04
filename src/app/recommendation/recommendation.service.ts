import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Recommendation } from './../models/recommendation';
import * as moment from 'moment';
import { RecommendationLevelRisk } from '../models/recommendation-level-risk';
import { RecommendationStatus } from '../models/recommendation-status';
import { RecommendationCharacter } from '../models/recommendation-character';
import { Entity } from '../models/entity';
import { RecommendationNature } from '../models/recommendation-nature';

export class RecommendationFilter {
  page: number = 0;
  rows: number = 15;

  number: number;

  processCode: string;
  description: string;

  entityAudited: Entity;
  status: RecommendationStatus;
  character: RecommendationCharacter;
  levelRisk: RecommendationLevelRisk;
  nature: RecommendationNature;

  amountMin: number;
  amountMax: number;

  createdAt: Date[];
  updatedAt: Date[];
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/recommendation`;
  }

  async create(recommendation: Recommendation): Promise<Recommendation> {
    return this.http.post<Recommendation>(this.API_URL, recommendation)
      .toPromise();
  }

  async read(filter: RecommendationFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    if (filter.number) {
      params = params.append('number', filter.number.toString());
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


    if (filter.amountMin) {
      console.log(filter.amountMin);
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

    const result = await this.http.get<any>(this.API_URL, { params })
      .toPromise()

    const recommendations: Recommendation[] = result.content;
    this.convertField(recommendations);

    return {
      content: recommendations,
      totalElements: result.totalElements
    }
  }

  async update(
    id: number,
    recommendation: Recommendation
  ): Promise<Recommendation> {
    return this.http.put<Recommendation>(
      `${this.API_URL}`, recommendation
    )
      .toPromise()
      .then((result) => {
        const recommendation = result as Recommendation;
        this.convertField([recommendation]);
        return recommendation;
      })
  }

  async getById(id: number): Promise<Recommendation> {
    return this.http.get<Recommendation>(`${this.API_URL}/${id}`)
      .toPromise()
      .then((result) => {
        const recommendation = result as Recommendation;
        this.convertField([recommendation]);
        return recommendation;
      })
  }

  private convertField(recommendations: Recommendation[]) {
    for (const recommendation of recommendations) {
      recommendation.createdAt = moment(recommendation.createdAt, 'YYYY-MM-DD hh:mm:ss').toDate();
      recommendation.updatedAt = moment(recommendation.updatedAt, 'YYYY-MM-DD hh:mm:ss').toDate();

      recommendation.audit.processCode =
        `${recommendation.audit.year}.${recommendation.audit.entityAudited.initial}.${recommendation.audit.number}`;

      recommendation.audit.dispatchedAt = moment(recommendation.audit.dispatchedAt, 'YYYY-MM-DD').toDate();
      recommendation.audit.reportedAt = moment(recommendation.audit.reportedAt, 'YYYY-MM-DD').toDate();
    }
  }
}
