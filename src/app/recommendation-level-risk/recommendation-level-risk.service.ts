import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecommendationLevelRiskService {

  constructor() { }

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
