import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Compliance } from './../models/compliance';

export class ComplianceFilter {
  page: number = 0;
  rows: number = 10;

  number: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComplianceService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/compliance`;
  }

  async create(compliance: Compliance): Promise<Compliance> {
    return this.http.post<Compliance>(this.API_URL, compliance)
      .toPromise();
  }

  async read(filter: ComplianceFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    return this.http.get<any>(this.API_URL, { params })
      .toPromise()
      .then((result) => {
        const compliances: Compliance[] = result.content;
        this.convertField(compliances);
        return {
          content: compliances,
          totalElements: result.totalElements
        }
      });
  }

  async update(id: number, compliance: Compliance): Promise<Compliance> {
    return this.http.put<Compliance>(`${this.API_URL}`, compliance)
      .toPromise()
      .then((result => {
        const compliance = result as Compliance;
        this.convertField([compliance]);
        return compliance;
      }))
  }

  async getById(id: number): Promise<Compliance> {
    return this.http.get<Compliance>(`${this.API_URL}/${id}`)
      .toPromise()
      .then((result => {
        const compliance = result as Compliance;
        this.convertField([compliance]);
        return compliance;
      }))
  }

  private convertField(compliances: Compliance[]) {
    for (const compliance of compliances) {
      compliance.createdAt = moment(compliance.createdAt, 'YYYY-MM-DD').toDate();
      compliance.updatedAt = moment(compliance.updatedAt, 'YYYY-MM-DD').toDate();
      compliance.evaluatedAt = moment(compliance.evaluatedAt, 'YYYY-MM-DD').toDate();

      compliance.recommendation.audit.dispatchedAt =
        moment(compliance.recommendation.audit.dispatchedAt, 'YYYY-MM-DD')
          .toDate();
      compliance.recommendation.audit.reportedAt =
        moment(compliance.recommendation.audit.reportedAt, 'YYYY-MM-DD')
          .toDate();
    }
  }
}
