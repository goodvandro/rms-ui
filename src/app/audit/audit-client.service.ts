import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from './../../environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Audit } from './../models/audit';

export class AuditClientFilter {
  page: number = 0;
  rows: number = 10;

  number: string;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuditClientService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/audit/entityAudited`;
  }

  async read(filter: AuditClientFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    return this.http.get<any>(this.API_URL, { params })
      .toPromise()
      .then((result) => {
        const audits: Audit[] = result.content;
        this.convertField(audits);
        return {
          content: audits,
          totalElements: result.totalElements
        }
      });
  }

  async getById(id: number): Promise<Audit> {
    return this.http.get<Audit>(`${this.API_URL}/${id}`)
      .toPromise()
      .then((result => {
        const audit = result as Audit;
        this.convertField([audit]);
        return audit;
      }))
  }

  private convertField(audits: Audit[]) {
    for (const audit of audits) {
      audit.processCode = `${audit.year}.${audit.entityAudited.initial}.${audit.number}`;

      audit.dispatchedAt = moment(audit.dispatchedAt, 'YYYY-MM-DD').toDate();
      audit.reportedAt = moment(audit.reportedAt, 'YYYY-MM-DD').toDate();
    }
  }
}
