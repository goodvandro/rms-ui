import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { RecommendationStatus } from './../models/recommendation-status';

@Injectable({
  providedIn: 'root'
})
export class RecommendationStatusService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/recommendationStatus`;
  }

  async create(status: RecommendationStatus): Promise<RecommendationStatus> {
    return this.http.post<RecommendationStatus>(this.API_URL, status)
      .toPromise();
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL)
      .toPromise();
  }

  async update(id: number, status: RecommendationStatus)
    : Promise<RecommendationStatus> {
    return this.http.put<RecommendationStatus>(`${this.API_URL}`, status)
      .toPromise();
  }

  async getById(id: number): Promise<RecommendationStatus> {
    return this.http.get<RecommendationStatus>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  JSON() {
    return [
      {
        id: 1,
        name: 'Aberto',
      },
      {
        id: 2,
        name: 'Em processamento',
      },
      {
        id: 3,
        name: 'Fechado',
      },
    ]
  }
}
