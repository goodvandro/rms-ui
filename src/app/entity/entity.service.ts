import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Entity } from './../models/entity';
import { EntityFilter, getFilterParams } from './entity-filter-resource';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/entity`;
  }

  async create(entity: Entity): Promise<Entity> {
    return this.http.post<Entity>(this.API_URL, entity).toPromise();
  }

  async read(filter: EntityFilter): Promise<any> {
    let params: HttpParams = getFilterParams(filter);

    return this.http.get<any>(this.API_URL, { params }).toPromise();
  }

  async readAll(): Promise<Entity[]> {
    return this.http.get<Entity[]>(`${this.API_URL}/list`).toPromise();
  }

  async update(id: number, entity: Entity): Promise<Entity> {
    return this.http
      .put<Entity>(`${this.API_URL}`, entity)
      .toPromise()
      .then((result) => {
        const entity = result as Entity;
        this.convertField([entity]);
        return entity;
      });
  }

  async getById(id: number): Promise<Entity> {
    return this.http
      .get<Entity>(`${this.API_URL}/${id}`)
      .toPromise()
      .then((result) => {
        const entity = result as Entity;
        this.convertField([entity]);
        return entity;
      });
  }

  private convertField(entities: Entity[]) {
    for (const entity of entities) {
      if (entity.createdAt)
        entity.createdAt = moment(
          entity.createdAt,
          'YYYY-MM-DD hh:mm:ss'
        ).toDate();

      if (entity.updatedAt)
        entity.updatedAt = moment(
          entity.updatedAt,
          'YYYY-MM-DD hh:mm:ss'
        ).toDate();
    }
  }
}
