import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { ReportRecommendation } from './../models/reports';

export class ReportRecommendationFilter {
  page: number = 0;
  rows: number = 10;

  dispatchedAt: Date[];
  recommendationCharacterSlug: string;
  recommendationLevelRisk: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}`;
  }

  async read(filter: ReportRecommendationFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    if (filter.dispatchedAt) {
      if (filter.dispatchedAt[0])
        params = params.append('dispatchedAtStart', moment(filter.dispatchedAt[0]).format('YYYY-MM-DD'));
      if (filter.dispatchedAt[1])
        params = params.append('dispatchedAtEnd', moment(filter.dispatchedAt[1]).format('YYYY-MM-DD'));
    }

    if (filter.recommendationCharacterSlug) {
      params = params.append('recommendationCharacterSlug', filter.recommendationCharacterSlug);
    }

    if (filter.recommendationLevelRisk) {
      params = params.append('recommendationLevelRisk', filter.recommendationLevelRisk);
    }

    return this.http.get<any>(`${this.API_URL}/audit/report`, { params })
      .toPromise()
      .then((result) => {
        const reports: ReportRecommendation[] = result.content;
        this.convertReportRecommendationField(reports);
        return {
          content: reports,
          totalElements: result.totalElements
        }
      });
  }

  private convertReportRecommendationField(reports: ReportRecommendation[]) {
    for (const report of reports) {

      if (report.auditReportedAt)
        report.auditReportedAt = moment(report.auditReportedAt, 'YYYY-MM-DD')
          .toDate();
    }
  }
}
