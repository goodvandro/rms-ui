import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppHttClient } from '../auth/app-http-client';
import { environment } from './../../environments/environment';
import { User } from './../models/user';

export class UserFilter {
  page: number = 0;
  rows: number = 15;

  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/user`;
  }

  async create(user: User): Promise<User> {
    return this.http.post<User>(this.API_URL, user)
      .toPromise();
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL,)
      .toPromise()
  }

  async read(filter: UserFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    return this.http.get<any>(this.API_URL, { params })
      .toPromise()
  }

  async update(id: number, user: User): Promise<User> {
    return this.http.put<User>(this.API_URL, user)
      .toPromise();
  }

  async patch(id: number, user: User): Promise<User> {
    console.log(user);
    return this.http.patch<User>(this.API_URL, user)
      .toPromise();
  }

  async getById(id: number): Promise<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`)
      .toPromise()
  }
}
