import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import * as moment from 'moment';
import { Address } from './../models/address';
import { AddressFilter, getFilterParams } from './address-filter-resource';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/address`;
  }

  async create(address: Address): Promise<Address> {
    return this.http.post<Address>(this.API_URL, address).toPromise();
  }

  async read(filter: AddressFilter): Promise<any> {
    const params: HttpParams = getFilterParams(filter);

    const result = await this.http
      .get<any>(this.API_URL, { params })
      .toPromise();

    const addresses: Address[] = result.content;
    this.convertField(addresses);

    return {
      content: addresses,
      totalElements: addresses.length,
    };
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(`${this.API_URL}/list`).toPromise();
  }

  async update(id: number, address: Address): Promise<Address> {
    return this.http.put<Address>(`${this.API_URL}`, address).toPromise();
  }

  async getById(id: number): Promise<Address> {
    return this.http.get<Address>(`${this.API_URL}/${id}`).toPromise();
  }

  private convertField(recommendations: Address[]) {
    for (const recommendation of recommendations) {
      recommendation.createdAt = moment(
        recommendation.createdAt,
        'YYYY-MM-DD hh:mm:ss'
      ).toDate();
      recommendation.updatedAt = moment(
        recommendation.updatedAt,
        'YYYY-MM-DD hh:mm:ss'
      ).toDate();
    }
  }
}
