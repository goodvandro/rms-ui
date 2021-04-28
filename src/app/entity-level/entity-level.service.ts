import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { EntityLevel } from './../models/entity-level';

@Injectable({
  providedIn: 'root'
})
export class EntityLevelService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/entityLevel`;
  }

  async create(entityLevel: EntityLevel): Promise<EntityLevel> {
    return this.http.post<EntityLevel>(this.API_URL, entityLevel)
      .toPromise();
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL)
      .toPromise();
  }

  async update(id: number, entityLevel: EntityLevel): Promise<EntityLevel> {
    return this.http.put<EntityLevel>(`${this.API_URL}`, entityLevel)
      .toPromise();
  }

  async getById(id: number): Promise<EntityLevel> {
    return this.http.get<EntityLevel>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  JSON() {
    return [
      {
        id: 1,
        name: 'Central',
      },
      {
        id: 2,
        name: 'Provincial',
      },
      {
        id: 3,
        name: 'Distrital',
      },
      {
        id: 4,
        name: 'Autárquico',
      },
    ]
  }
}
