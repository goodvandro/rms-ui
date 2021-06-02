import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Recommendation } from './../models/recommendation';

export class RecommendationClientFilter {
  page: number = 0;
  rows: number = 15;

  processCode: string;
  number: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationClientService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/recommendation/entityAudited`;
  }

  async read(filter: RecommendationClientFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    if (filter.number) {
      params = params.append('number', filter.number.toString());
    }

    if (filter.processCode) {
      params = params.append('processCode', filter.processCode);
    }

    if (filter.description) {
      params = params.append('description', filter.description);
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

  private convertField(recommendations: Recommendation[]) {
    for (const recommendation of recommendations) {
      recommendation.createdAt = moment(recommendation.createdAt, 'YYYY-MM-DD').toDate();
      recommendation.updatedAt = moment(recommendation.updatedAt, 'YYYY-MM-DD').toDate();

      recommendation.audit.processCode =
        `${recommendation.audit.year}.${recommendation.audit.entityAudited.initial}.${recommendation.audit.number}`;

      recommendation.audit.dispatchedAt = moment(recommendation.audit.dispatchedAt, 'YYYY-MM-DD').toDate();
      recommendation.audit.reportedAt = moment(recommendation.audit.reportedAt, 'YYYY-MM-DD').toDate();
    }
  }
}
