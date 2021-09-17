import { AuditStatusHistory } from './../models/audit-status-history';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';

@Injectable({
  providedIn: 'root'
})
export class AuditHistoryService {
  ENDPOINT: string;

  constructor(
    private http: AppHttClient
  ) {
    this.ENDPOINT = `${environment.apiUrl}/auditHistory`;
  }

  async getByAuditId(auditId: number): Promise<AuditStatusHistory[]> {
    let params = new HttpParams();
    params = params.append('idAudit', auditId.toString());

    return this.http.get<AuditStatusHistory[]>(this.ENDPOINT, { params })
      .toPromise();
  }
}
