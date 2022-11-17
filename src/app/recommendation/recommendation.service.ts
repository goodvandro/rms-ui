import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Recommendation } from './../models/recommendation';
import * as moment from 'moment';
import { HttpParams } from '@angular/common/http';
import {
  RecommendationFilter,
  getFilterParams,
} from './recommendation-filter-resource';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/recommendation`;
  }

  async create(recommendation: Recommendation): Promise<Recommendation> {
    return this.http
      .post<Recommendation>(this.API_URL, recommendation)
      .toPromise();
  }

  async read(filter: RecommendationFilter): Promise<any> {
    const params: HttpParams = getFilterParams(filter);

    const result = await this.http
      .get<any>(this.API_URL, { params })
      .toPromise();

    const recommendations: Recommendation[] = result.content;
    this.convertField(recommendations);

    return {
      content: recommendations,
      totalElements: result.totalElements,
    };
  }

  async update(
    id: number,
    recommendation: Recommendation
  ): Promise<Recommendation> {
    return this.http
      .put<Recommendation>(`${this.API_URL}`, recommendation)
      .toPromise()
      .then((result) => {
        const recommendation = result as Recommendation;
        this.convertField([recommendation]);
        return recommendation;
      });
  }

  async getById(id: number): Promise<Recommendation> {
    return this.http
      .get<Recommendation>(`${this.API_URL}/${id}`)
      .toPromise()
      .then((result) => {
        const recommendation = result as Recommendation;
        this.convertField([recommendation]);
        return recommendation;
      });
  }

  private convertField(recommendations: Recommendation[]) {
    for (const recommendation of recommendations) {
      recommendation.createdAt = moment(
        recommendation.createdAt,
        'YYYY-MM-DD hh:mm:ss'
      ).toDate();

      recommendation.updatedAt = moment(
        recommendation.updatedAt,
        'YYYY-MM-DD hh:mm:ss'
      ).toDate();

      if (recommendation.complianceDeadline) {
        recommendation.complianceDeadline = moment(
          recommendation.complianceDeadline,
          'YYYY-MM-DD'
        ).toDate();
      }

      recommendation.audit.processCode = `${recommendation.audit.year}.${recommendation.audit.entityAudited.initial}.${recommendation.audit.number}`;

      recommendation.audit.dispatchedAt = moment(
        recommendation.audit.dispatchedAt,
        'YYYY-MM-DD'
      ).toDate();
      recommendation.audit.reportedAt = moment(
        recommendation.audit.reportedAt,
        'YYYY-MM-DD'
      ).toDate();
    }
  }
}
