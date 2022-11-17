import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { GroupWork } from './../models/group-work';
import { GroupWorkFilter, getFilterParams } from './group-work-filter-resource';

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

    return this.http.get<any>(this.API_URL, { params }).toPromise();
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
}
