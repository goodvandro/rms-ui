import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Audit } from './../models/audit';

export class AuditFilter {
  page: number = 0;
  rows: number = 15;

  number: string;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/audit`;
  }

  async create(audit: Audit): Promise<Audit> {
    delete audit.entityAuditor;

    return this.http.post<Audit>(this.API_URL, audit)
      .toPromise();
  }

  async read(filter: AuditFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    return this.http.get<any>(this.API_URL, { params })
      .toPromise();
  }

  async update(id: number, audit: Audit): Promise<Audit> {
    return this.http.put<Audit>(`${this.API_URL}`, audit)
      .toPromise();
  }

  async getById(id: number): Promise<Audit> {
    return this.http.get<Audit>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  static convertField(audits: Audit[]) {
    for (const audit of audits) {
      audit.processCode = `${audit.year}.${audit.entityAudited.initial}.${audit.number}`;
    }
  }

  JSON() {
    return [
      {
        id: 1,
        number: '017.SAU.01',
        year: 2020,
        entityAudited: {
          id: 1,
          name: 'Direção Geral das Alfandegas'
        },
        description: 'Inspeção Ordinária a Direção Geral das Alfandegas',
        createdAt: new Date()
      },
      {
        id: 2,
        number: '017.SAU.02',
        year: 2020,
        entityAudited: {
          id: 1,
          name: 'Direção Geral das Alfandegas'
        },
        description: 'Inspeção Ordinária a Direção Geral das Alfandegas',
        createdAt: new Date()
      },
      {
        id: 2021,
        number: '017.SAU.03',
        year: 2021,
        entityAudited: {
          id: 1,
          name: 'Direção Geral das Alfandegas'
        },
        description: 'Inspeção Ordinária a Direção Geral das Alfandegas',
        createdAt: new Date()
      },
    ]
  }
}
