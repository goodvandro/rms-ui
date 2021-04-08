import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppHttClient } from '../auth/app-http-client';
import { environment } from './../../environments/environment';
import { Activity } from './../models/activity';

export class ActivityFilter {
  page: number = 0;
  rows: number = 15;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/activities`;
  }

  async read(filter: ActivityFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    return this.http.get<any>(this.API_URL, { params })
      .toPromise();
  }

  async getById(id: number): Promise<Activity> {
    return this.http.get<Activity>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  activitiesJSON() {
    return [
      {
        id: 1,
        description: 'autenticou-se',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: 1,
          username: 'ana@igf.gov.st'
        },
        typeActivity: {
          id: 1,
          name: 'sign-in',
        }
      },
      {
        id: 2,
        description: 'cadastrou auditoria: 628',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: 1,
          username: 'ana@igf.gov.st'
        },
        typeActivity: {
          id: 2,
          name: 'store',
        }
      },
      {
        id: 3,
        description: 'editou recomendação: 579',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: 1,
          username: 'ana@igf.gov.st'
        },
        typeActivity: {
          id: 3,
          name: 'update',
        }
      },
    ]
  }
}
