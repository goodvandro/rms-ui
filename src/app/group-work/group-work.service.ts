import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
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

    const result = await this.http
      .get<any>(this.API_URL, { params })
      .toPromise();

    const groupWorks: GroupWork[] = result;
    this.convertField(groupWorks);
    return groupWorks;
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL).toPromise();
  }

  async update(id: number, groupWork: GroupWork): Promise<GroupWork> {
    return this.http.put<GroupWork>(`${this.API_URL}`, groupWork).toPromise();
  }

  async getById(id: number): Promise<GroupWork> {
    return this.http
      .get<GroupWork>(`${this.API_URL}/${id}`)
      .toPromise()
      .then((result) => {
        const groupWork = result as GroupWork;
        this.convertField([groupWork]);
        return groupWork;
      });
  }

  async delete(id: number): Promise<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).toPromise();
  }

  private convertField(groupsWork: GroupWork[]) {
    for (const groupWork of groupsWork) {
      groupWork.createdAt = moment(
        groupWork.createdAt,
        'YYYY-MM-DD hh:mm:ss'
      ).toDate();
      groupWork.updatedAt = moment(
        groupWork.updatedAt,
        'YYYY-MM-DD hh:mm:ss'
      ).toDate();
    }
  }
}
