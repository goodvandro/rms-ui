import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Permission } from './../models/permission';

export class PermissionFilter {
  page: number = 0;
  rows: number = 15;

  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/permission`;
  }

  async create(permission: Permission): Promise<Permission> {
    return this.http.post<Permission>(this.API_URL, permission)
      .toPromise();
  }

  async read(filter: PermissionFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    return this.http.get<any>(this.API_URL, { params })
      .toPromise();
  }

  async update(id: number, permission: Permission): Promise<Permission> {
    return this.http.put<Permission>(`${this.API_URL}`, permission)
      .toPromise();
  }

  async getById(id: number): Promise<Permission> {
    return this.http.get<Permission>(`${this.API_URL}/${id}`)
      .toPromise()
  }
}
