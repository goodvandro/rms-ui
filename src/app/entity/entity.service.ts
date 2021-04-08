import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Entity } from './../models/entity';

export class EntityFilter {
  page: number = 0;
  rows: number = 15;

  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class EntityService {
    API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/groups`;
  }

  async create(entity: Entity): Promise<Entity> {
    return this.http.post<Entity>(this.API_URL, entity)
      .toPromise();
  }

  async read(filter: EntityFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    await this.http.get<any>(this.API_URL, { params })
      .toPromise();
  }

  async update(id: number, entity: Entity): Promise<Entity> {
    return this.http.put<Entity>(`${this.API_URL}/${id}`, entity)
      .toPromise();
  }

  async getById(id: number): Promise<Entity> {
    return this.http.get<Entity>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  JSON() {
    return [
      {
        id: 1,
        name: 'Inspeção Geral das Finanças',
        initial: 'IGF',
        isAuditor: true,
        address: {
          id: 1,
          city: 'São Tomé',
          district: 'Água Grande',
          street: 'Rua 3',
        },
        level: {
          id: 1,
          name: 'Central'
        },
        createdAt: new Date()
      },
      {
        id: 2,
        name: 'Direção do Comércio',
        initial: 'DA',
        isAuditor: false,
        address: {
          id: 1,
          city: 'São Tomé',
          district: 'Água Grande',
          street: 'Rua 3',
        },
        level: {
          id: 1,
          name: 'Central'
        },
        createdAt: new Date()
      }
    ]
  }
}
