import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = `${environment.apiUrl}/user`;
  }

  async forgotPassword(email: string): Promise<any> {
    let params = new HttpParams();
    params = params.append('email', email);

    return this.http.get(`${this.API_URL}/forgotPassword`, { params })
      .toPromise();
  }

  async recoverPassword({ email, code }): Promise<any> {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('code', code);

    return this.http.get(`${this.API_URL}/forgotPassword/validCode`,
      { params })
      .toPromise();
  }

  async changePassword(user: User): Promise<User> {
    return this.http.put<User>(`${this.API_URL}/password`, user)
      .toPromise()
  }
}
