import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Recommendation } from './../models/recommendation';
import * as moment from 'moment';

export class RecommendationFilter {
  page: number = 0;
  rows: number = 15;

  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/recommendation`;
  }

  async create(recommendation: Recommendation): Promise<Recommendation> {
    return this.http.post<Recommendation>(this.API_URL, recommendation)
      .toPromise();
  }

  async read(filter: RecommendationFilter): Promise<any> {
    let params = new HttpParams();
    params = params.append('page', filter.page.toString());
    params = params.append('size', filter.rows.toString());

    const result = await this.http.get<any>(this.API_URL, { params })
      .toPromise()

    const recommendations: Recommendation[] = result.content;
    this.convertField(recommendations);

    return {
      content: recommendations,
      totalElements: result.totalElements
    }
  }

  async update(
    id: number,
    recommendation: Recommendation
  ): Promise<Recommendation> {
    return this.http.put<Recommendation>(
      `${this.API_URL}/${id}`, recommendation
    )
      .toPromise();
  }

  async getById(id: number): Promise<Recommendation> {
    return this.http.get<Recommendation>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  private convertField(recommendations: Recommendation[]) {
    for (const recommendation of recommendations) {
      recommendation.createdAt = moment(recommendation.createdAt, 'YYYY-MM-DD').toDate();
      recommendation.updatedAt = moment(recommendation.updatedAt, 'YYYY-MM-DD').toDate();
    }
  }

  JSON() {
    return [
      {
        id: 1,
        number: 10001,
        description: 'Preencher diariamente o livro e responsabilizar um técnico pelo controlo do mesmo',
        constatation: 'Falta de preenchimento do livro de ponto',
        amount: 4900,
        status: {
          id: 1,
          name: 'Aberto'
        },
        character: {
          id: 1,
          name: 'Procedimental'
        },
        nature: {
          id: 1,
          name: 'Contabilidade'
        },
        leveRisk: {
          id: 1,
          name: 'Crítico'
        },
        createdAt: new Date()
      },
      {
        id: 1,
        number: 10001,
        description: 'Preencher diariamente o livro e responsabilizar um técnico pelo controlo do mesmo',
        constatation: 'Falta de preenchimento do livro de ponto',
        amount: 4900,
        status: {
          id: 1,
          name: 'Aberto'
        },
        character: {
          id: 1,
          name: 'Procedimental'
        },
        nature: {
          id: 1,
          name: 'Contabilidade'
        },
        leveRisk: {
          id: 1,
          name: 'Crítico'
        },
        createdAt: new Date()
      },
      {
        id: 1,
        number: 10001,
        description: 'Preencher diariamente o livro e responsabilizar um técnico pelo controlo do mesmo',
        constatation: 'Falta de preenchimento do livro de ponto',
        amount: 4900,
        status: {
          id: 1,
          name: 'Aberto'
        },
        character: {
          id: 1,
          name: 'Procedimental'
        },
        nature: {
          id: 1,
          name: 'Contabilidade'
        },
        leveRisk: {
          id: 1,
          name: 'Crítico'
        },
        createdAt: new Date()
      },
      {
        id: 1,
        number: 10001,
        description: 'Preencher diariamente o livro e responsabilizar um técnico pelo controlo do mesmo',
        constatation: 'Falta de preenchimento do livro de ponto',
        amount: 4900,
        status: {
          id: 1,
          name: 'Aberto'
        },
        character: {
          id: 1,
          name: 'Procedimental'
        },
        nature: {
          id: 1,
          name: 'Contabilidade'
        },
        leveRisk: {
          id: 1,
          name: 'Crítico'
        },
        createdAt: new Date()
      },
    ]
  }
}
