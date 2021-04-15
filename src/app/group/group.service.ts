import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Group } from './../models/group';

export class GroupFilter {
  page: number = 0;
  rows: number = 15;

  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/group`;
  }

  async create(group: Group): Promise<Group> {
    return this.http.post<Group>(this.API_URL, group)
      .toPromise();
  }

  async read(filter: GroupFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    return this.http.get<any>(this.API_URL, { params })
      .toPromise();
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL)
      .toPromise();
  }

  async update(id: number, group: Group): Promise<Group> {
    return this.http.put<Group>(`${this.API_URL}`, group)
      .toPromise();
  }

  async getById(id: number): Promise<Group> {
    return this.http.get<Group>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  JSON() {
    return [
      {
        id: 1,
        name: 'Root',
        slug: 'root',
        createdAt: new Date()
      },
      {
        id: 2,
        name: 'Administrador',
        slug: 'admin',
        createdAt: new Date()
      },
      {
        id: 3,
        name: 'Funcionários',
        slug: 'employee',
        createdAt: new Date()
      },
    ]
  }
}
