import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Compliance } from './../models/compliance';
import {
  ComplianceFilter,
  getFilterParams,
} from './compliance-filter-resource';

@Injectable({
  providedIn: 'root',
})
export class ComplianceService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/compliance`;
  }

  async create(compliance: Compliance): Promise<Compliance> {
    delete compliance.recommendation.audit.processCode;

    return this.http.post<Compliance>(this.API_URL, compliance).toPromise();
  }

  async read(filter: ComplianceFilter): Promise<any> {
    let params: HttpParams = getFilterParams(filter);

    return this.http
      .get<any>(this.API_URL, { params })
      .toPromise()
      .then((result) => {
        const compliances: Compliance[] = result.content;
        this.convertField(compliances);
        return {
          content: compliances,
          totalElements: result.totalElements,
        };
      });
  }

  async update(id: number, compliance: Compliance): Promise<Compliance> {
    return this.http
      .put<Compliance>(`${this.API_URL}`, compliance)
      .toPromise()
      .then((result) => {
        const compliance = result as Compliance;
        this.convertField([compliance]);
        return compliance;
      });
  }

  async getById(id: number): Promise<Compliance> {
    return this.http
      .get<Compliance>(`${this.API_URL}/${id}`)
      .toPromise()
      .then((result) => {
        const compliance = result as Compliance;
        this.convertField([compliance]);
        return compliance;
      });
  }

  private convertField(compliances: Compliance[]) {
    for (const compliance of compliances) {
      if (compliance.createdAt)
        compliance.createdAt = moment(
          compliance.createdAt,
          'YYYY-MM-DD hh:mm:ss'
        ).toDate();

      if (compliance.updatedAt)
        compliance.updatedAt = moment(
          compliance.updatedAt,
          'YYYY-MM-DD hh:mm:ss'
        ).toDate();

      if (compliance.evaluatedAt)
        compliance.evaluatedAt = moment(
          compliance.evaluatedAt,
          'YYYY-MM-DD'
        ).toDate();

      if (compliance.recommendation.audit.dispatchedAt)
        compliance.recommendation.audit.dispatchedAt = moment(
          compliance.recommendation.audit.dispatchedAt,
          'YYYY-MM-DD'
        ).toDate();

      if (compliance.recommendation.audit.reportedAt)
        compliance.recommendation.audit.reportedAt = moment(
          compliance.recommendation.audit.reportedAt,
          'YYYY-MM-DD'
        ).toDate();
    }
  }
}
