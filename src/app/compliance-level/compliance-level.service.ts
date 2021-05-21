import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { ComplianceLevel } from './../models/compliance-level';

@Injectable({
  providedIn: 'root'
})
export class ComplianceLevelService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/complianceLevel`;
  }

  async create(complianceLevel: ComplianceLevel): Promise<ComplianceLevel> {
    return this.http.post<ComplianceLevel>(this.API_URL, complianceLevel)
      .toPromise();
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL)
      .toPromise();
  }

  async update(id: number, complianceLevel: ComplianceLevel): Promise<ComplianceLevel> {
    return this.http.put<ComplianceLevel>(`${this.API_URL}`, complianceLevel)
      .toPromise();
  }

  async getById(id: number): Promise<ComplianceLevel> {
    return this.http.get<ComplianceLevel>(`${this.API_URL}/${id}`)
      .toPromise()
  }
}
