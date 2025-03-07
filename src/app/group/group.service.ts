import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Group } from './../models/group';

export class GroupFilter {
  page: number = 0;
  rows?: number = 10;
  sortField: string;
  sortOrder: string;

  name: string;

  createdAt: Date[];
}

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/group`;
  }

  async create(group: Group): Promise<Group> {
    return this.http.post<Group>(this.API_URL, group).toPromise();
  }

  async read(filter: GroupFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());
    params = params.append('sortField', filter.sortField);
    params = params.append('sortOrder', filter.sortOrder);

    if (filter.name) {
      params = params.append('name', filter.name);
    }

    if (filter.createdAt) {
      if (!!filter.createdAt[0])
        params = params.append(
          'createdAtFrom',
          moment(filter.createdAt[0]).format('YYYY-MM-DD')
        );
      if (!!filter.createdAt[1])
        params = params.append(
          'createdAtTo',
          moment(filter.createdAt[1]).format('YYYY-MM-DD')
        );
    }

    return this.http.get<any>(this.API_URL, { params }).toPromise();
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(`${this.API_URL}/list`).toPromise();
  }

  async update(id: number, group: Group): Promise<Group> {
    return this.http.put<Group>(`${this.API_URL}`, group).toPromise();
  }

  async getById(id: number): Promise<Group> {
    return this.http.get<Group>(`${this.API_URL}/${id}`).toPromise();
  }

  async delete(id: number): Promise<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).toPromise();
  }
}
