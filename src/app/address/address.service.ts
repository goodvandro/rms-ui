import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppHttClient } from './../auth/app-http-client';
import { Address } from './../models/address';

export class AddressFilter {
  page: number = 0;
  rows: number = 15;

  street: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  API_URL: string;

  constructor(private http: AppHttClient) {
    this.API_URL = `${environment.apiUrl}/address`;
  }

  async create(address: Address): Promise<Address> {
    return this.http.post<Address>(this.API_URL, address)
      .toPromise();
  }

  async read(filter: AddressFilter): Promise<any> {
    return this.http.get<any>(this.API_URL)
      .toPromise();
  }

  async readAll(): Promise<any> {
    return this.http.get<any>(this.API_URL)
      .toPromise();
  }

  async update(id: number, address: Address): Promise<Address> {
    return this.http.put<Address>(`${this.API_URL}`, address)
      .toPromise();
  }

  async getById(id: number): Promise<Address> {
    return this.http.get<Address>(`${this.API_URL}/${id}`)
      .toPromise()
  }

  JSON() {
    return [
      {
        id: 1,
        name: 'Praça da Independência',
      },
      {
        id: 2,
        name: 'Ponta Mina',
      },
      {
        id: 3,
        name: 'Bairro 3 de Fevereiro',
      },
    ]
  }
}
