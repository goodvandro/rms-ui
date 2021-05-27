import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuditFile } from '../models/audit-file';
import { AppHttClient } from './../auth/app-http-client';

@Injectable({
  providedIn: 'root'
})
export class AuditFileService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/auditFile`;
  }

  async create(formData: FormData): Promise<AuditFile> {
    return this.http.post<AuditFile>(this.API_URL, formData)
      .toPromise();
  }

  async update(file: AuditFile): Promise<AuditFile> {
    return this.http.put<AuditFile>(this.API_URL, file)
      .toPromise();
  }
}
