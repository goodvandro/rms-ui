import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { AuditStatus } from './../models/audit-status';

@Injectable({
  providedIn: 'root'
})
export class AuditStatusService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/auditStatus`;
  }

  async create(auditStatus: AuditStatus): Promise<AuditStatus> {
    return this.http.post<AuditStatus>(this.API_URL, auditStatus)
      .toPromise();
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL)
      .toPromise();
  }

  async update(id: number, auditStatus: AuditStatus): Promise<AuditStatus> {
    return this.http.put<AuditStatus>(`${this.API_URL}`, auditStatus)
      .toPromise();
  }

  async getById(id: number): Promise<AuditStatus> {
    return this.http.get<AuditStatus>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  JSON() {
    return [
      {
        id: 1,
        name: 'Aberto',
      },
      {
        id: 2,
        name: 'Em processamento',
      },
      {
        id: 3,
        name: 'Fechado',
      },
    ]
  }
}
