import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecommendationNatureService {

  constructor() { }

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
