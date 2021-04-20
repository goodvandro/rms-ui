import { RecommendationCharacter } from './../models/recommendation-character';
import { environment } from './../../environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecommendationCharacterService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/recommendationCharacter`;
  }

  async create(character: RecommendationCharacter)
    : Promise<RecommendationCharacter> {
    return this.http.post<RecommendationCharacter>(this.API_URL, character)
      .toPromise();
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL)
      .toPromise();
  }

  async update(id: number, character: RecommendationCharacter)
    : Promise<RecommendationCharacter> {
    return this.http.put<RecommendationCharacter>(`${this.API_URL}`, character)
      .toPromise();
  }

  async getById(id: number): Promise<RecommendationCharacter> {
    return this.http.get<RecommendationCharacter>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  JSON() {
    return [
      {
        id: 1,
        name: 'Procedimental',
      },
      {
        id: 2,
        name: 'Disciplinar',
      },
      {
        id: 3,
        name: 'Criminal',
      },
    ]
  }
}
