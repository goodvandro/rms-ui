import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  oauthTokenUrl: string;
  tokensRevokeUrl: string;
  jwtPayload: any;
  userSession: User;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.getToken();
  }

  async signIn({ email, password }): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', environment.basicAuthorization);

    const body = `username=${email}&password=${password}&grant_type=password`;

    try {
      const response = await this.http.post<any>(
        this.oauthTokenUrl, body, { headers, withCredentials: true }
      ).toPromise();

      localStorage.setItem('isFirst', JSON.stringify(response.user.isFirst));
      this.setToken(response.access_token);
      return;
    } catch (error) {
      console.error('login-error', error);

      if (error.status === 400) {
        if (error.error.error === 'invalid_grant') {
          return Promise.reject('Utilizador ou senha inválida! Tente de novo!');
        }
      }
      return await Promise.reject(error);
    }
  }

  private setToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('igfToken', token);
  }

  private getToken() {
    const token = localStorage.getItem('igfToken');

    if (token) {
      this.setToken(token);
    }
  }

  hasPermission(permission: string) {
    const user: User = this.getAuthorities();
    return user && user.authorities.includes(permission)
  }

  // hasPermission_(permission: string) {
  //   return this.jwtPayload &&
  //     this.jwtPayload.authorities.includes(permission);
  // }

  hasAnyPermission(roles: string[]) {
    for (const role of roles) {
      if (this.hasPermission(role)) {
        return true;
      }
    }
    return false;
  }

  isAccessTokenInvalid() {
    const token = localStorage.getItem('igfToken');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  cleanAccessToken() {
    localStorage.removeItem('igfToken');
    localStorage.removeItem('igfUserSession');
    localStorage.removeItem('isFirst');
    this.jwtPayload = null;
  }

  async getNewAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', environment.basicAuthorization);

    const body = 'grant_type=refresh_token';

    try {
      const response = await this.http.post<any>(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
        .toPromise();
      this.setToken(response.access_token);

      return await Promise.resolve(null);
    } catch (response_1) {
      console.error('Error renewing token.', response_1);
      return await Promise.resolve(null);
    }
  }

  getAuthorities(): User {
    const user: User = JSON.parse(localStorage.getItem('authorities'));
    return user;
  }

  setAuthorities(authorities: string[]): void {
    localStorage.setItem('authorities', JSON.stringify(authorities))
  }
}
