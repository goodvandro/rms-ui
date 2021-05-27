import { Injectable } from '@angular/core';
import { AuditReport } from '../models/audit-report';
import { environment } from './../../environments/environment';
import { AppHttClient } from './../auth/app-http-client';

@Injectable({
  providedIn: 'root'
})
export class AuditReportService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/auditReport`;
  }

  async create(report: AuditReport): Promise<AuditReport> {
    return this.http.post<AuditReport>(this.API_URL, report)
      .toPromise();
  }

  async update(report: AuditReport): Promise<AuditReport> {
    return this.http.put<AuditReport>(this.API_URL, report)
      .toPromise();
  }
}
