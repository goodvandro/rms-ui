import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { RecommendationLevelRisk } from './../models/recommendation-level-risk';

@Injectable({
  providedIn: 'root'
})
export class RecommendationLevelRiskService {
    API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/recommendationLevelRisk`;
  }

  async create(levelRisk: RecommendationLevelRisk): Promise<RecommendationLevelRisk> {
    return this.http.post<RecommendationLevelRisk>(this.API_URL, levelRisk)
      .toPromise();
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL)
      .toPromise();
  }

  async update(id: number, levelRisk: RecommendationLevelRisk)
    : Promise<RecommendationLevelRisk> {
    return this.http.put<RecommendationLevelRisk>(`${this.API_URL}`, levelRisk)
      .toPromise();
  }

  async getById(id: number): Promise<RecommendationLevelRisk> {
    return this.http.get<RecommendationLevelRisk>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  JSON() {
    return [
      {
        id: 1,
        name: 'Aceitável',
      },
      {
        id: 2,
        name: 'Moderado',
      },
      {
        id: 3,
        name: 'Crítico',
      },
      {
        id: 4,
        name: 'Muito Crítico',
      },
    ]
  }
}
