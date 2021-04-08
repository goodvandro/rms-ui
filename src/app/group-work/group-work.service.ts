import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { GroupWork } from './../models/group-work';

export class GroupWorkFilter {
  page: number = 0;
  rows: number = 15;

  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroupWorkService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/groups`;
  }

  async create(groupWork: GroupWork): Promise<GroupWork> {
    return this.http.post<GroupWork>(this.API_URL, groupWork)
      .toPromise();
  }

  async read(filter: GroupWorkFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    await this.http.get<any>(this.API_URL, { params })
      .toPromise();
  }

  async update(id: number, groupWork: GroupWork): Promise<GroupWork> {
    return this.http.put<GroupWork>(`${this.API_URL}/${id}`, groupWork)
      .toPromise();
  }

  async getById(id: number): Promise<GroupWork> {
    return this.http.get<GroupWork>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  JSON() {
    return [
      {
        id: 1,
        name: 'Grupo de trabalho 1',
        createdAt: new Date()
      },
      {
        id: 2,
        name: 'Grupo de trabalho 2',
        createdAt: new Date()
      },
      {
        id: 3,
        name: 'Grupo de trabalho 3',
        createdAt: new Date()
      },
    ]
  }
}
