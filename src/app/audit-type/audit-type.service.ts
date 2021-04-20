import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { AuditType } from './../models/audit-type';

@Injectable({
  providedIn: 'root'
})
export class AuditTypeService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/auditType`;
  }

  async create(auditType: AuditType): Promise<AuditType> {
    return this.http.post<AuditType>(this.API_URL, auditType)
      .toPromise();
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL)
      .toPromise();
  }

  async update(id: number, auditType: AuditType): Promise<AuditType> {
    return this.http.put<AuditType>(`${this.API_URL}`, auditType)
      .toPromise();
  }

  async getById(id: number): Promise<AuditType> {
    return this.http.get<AuditType>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  JSON() {
    return [
      {
        id: 1,
        name: 'Tipo 1',
      },
      {
        id: 2,
        name: 'Tipo 2',
      },
      {
        id: 3,
        name: 'Tipo 3',
      },
    ]
  }
}
