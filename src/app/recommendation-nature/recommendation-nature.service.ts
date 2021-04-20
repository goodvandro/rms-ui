import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { RecommendationNature } from './../models/recommendation-nature';

@Injectable({
  providedIn: 'root'
})
export class RecommendationNatureService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/recommendationNature`;
  }

  async create(nature: RecommendationNature): Promise<RecommendationNature> {
    return this.http.post<RecommendationNature>(this.API_URL, nature)
      .toPromise();
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL)
      .toPromise();
  }

  async update(id: number, nature: RecommendationNature)
    : Promise<RecommendationNature> {
    return this.http.put<RecommendationNature>(`${this.API_URL}`, nature)
      .toPromise();
  }

  async getById(id: number): Promise<RecommendationNature> {
    return this.http.get<RecommendationNature>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  JSON() {
    return [
      {
        id: 1,
        name: 'Contabilidade',
      },
      {
        id: 2,
        name: 'Recurso Humano',
      },
      {
        id: 3,
        name: 'Administração',
      },
    ]
  }
}
