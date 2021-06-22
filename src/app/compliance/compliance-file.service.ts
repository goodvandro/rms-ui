import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComplianceFile } from '../models/compliance-file';
import { AppHttClient } from './../auth/app-http-client';

@Injectable({
  providedIn: 'root'
})
export class ComplianceFileService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/complianceFile`;
  }

  async create(formData: FormData): Promise<ComplianceFile> {
    return this.http.post<ComplianceFile>(this.API_URL, formData)
      .toPromise();
  }

  async update(file: ComplianceFile): Promise<ComplianceFile> {
    return this.http.put<ComplianceFile>(this.API_URL, file)
      .toPromise();
  }
}
