import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RecommendationFile } from '../models/recommendation-file';
import { AppHttClient } from './../auth/app-http-client';

@Injectable({
  providedIn: 'root'
})
export class RecommendationFileService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/recommendationFile`;
  }

  async create(formData: FormData): Promise<RecommendationFile> {
    return this.http.post<RecommendationFile>(this.API_URL, formData)
      .toPromise();
  }

  async update(file: RecommendationFile): Promise<RecommendationFile> {
    return this.http.put<RecommendationFile>(this.API_URL, file)
      .toPromise();
  }
}
