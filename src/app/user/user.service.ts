import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AppHttClient } from '../auth/app-http-client';
import { AuthService } from '../auth/auth.service';
import { environment } from './../../environments/environment';
import { User } from './../models/user';

export class UserFilter {
  page: number = 0;
  rows: number = 10;

  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL: string;

  constructor(
    private http: AppHttClient,
    private auth: AuthService,
  ) {
    this.API_URL = `${environment.apiUrl}/user`;
  }

  async create(user: User): Promise<User> {
    return this.http.post<User>(this.API_URL, user)
      .toPromise();
  }

  async readAll(): Promise<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/list`)
      .toPromise()
  }

  async read(filter: UserFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    return this.http.get<any>(this.API_URL, { params })
      .toPromise()
      .then((result) => {
        const users: User[] = result.content;
        this.convertField(users);
        return {
          content: users,
          totalElements: result.totalElements
        }
      })
  }

  async update(id: number, user: User): Promise<User> {
    return this.http.put<User>(this.API_URL, user)
      .toPromise()
      .then((result) => {
        const user = result as User;
        this.convertField([user]);
        return user;
      })
  }

  async patch(id: number, user: User): Promise<User> {
    return this.http.patch<User>(this.API_URL, user)
      .toPromise()
      .then((result) => {
        const user = result as User;
        this.convertField([user]);
        return user;
      })
  }

  async getById(id: number): Promise<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`)
      .toPromise()
      .then((result) => {
        const user = result as User;
        this.convertField([user]);
        return user;
      })
  }

  async setAuthorities(): Promise<void> {
    const result: User = await this.http.get<User>(`${this.API_URL}/me`)
      .toPromise()
    const authorities: string[] = result.group.permissions.map(
      (permission) => permission.role
    );
    this.auth.setAuthorities(authorities);
  }

  private convertField(users: User[]) {
    for (const user of users) {
      user.createdAt = moment(user.createdAt, 'YYYY-MM-DD').toDate();
      user.updatedAt = moment(user.updatedAt, 'YYYY-MM-DD').toDate();
    }
  }
}
