import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { AppHttClient } from './app-http-client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignOutService {
  tokensRevokeUrl: string;

  constructor(
    private http: AppHttClient,
    private auth: AuthService
  ) {
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  async signOut(): Promise<void> {
    await this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise();
    this.auth.cleanAccessToken();
  }
}
