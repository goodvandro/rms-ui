import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { GroupWork } from './../models/group-work';
import { getFilterParams, GroupWorkFilter } from './group-work-filter-resource';

@Injectable({
  providedIn: 'root',
})
export class GroupWorkService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/groupWork`;
  }

  async create(groupWork: GroupWork): Promise<GroupWork> {
    return this.http.post<GroupWork>(this.API_URL, groupWork).toPromise();
  }

  async read(filter: GroupWorkFilter): Promise<any> {
    let params: HttpParams = getFilterParams(filter);

    const result = await this.http.get<any>(this.API_URL, { params }).toPromise();

    const groupWorks: GroupWork[] = result.content;
    this.convertField(groupWorks);

    return {
      content: groupWorks,
      totalElements: result.totalElements
    }
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL).toPromise();
  }

  async update(id: number, groupWork: GroupWork): Promise<GroupWork> {
    return this.http.put<GroupWork>(`${this.API_URL}`, groupWork).toPromise();
  }

  async getById(id: number): Promise<GroupWork> {
    return this.http.get<GroupWork>(`${this.API_URL}/${id}`).toPromise();
  }

  private convertField(users: GroupWork[]) {
    for (const user of users) {
      user.createdAt = moment(user.createdAt, 'YYYY-MM-DD').toDate();
      user.updatedAt = moment(user.updatedAt, 'YYYY-MM-DD').toDate();
    }
  }
}
