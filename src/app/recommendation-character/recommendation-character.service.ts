import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecommendationCharacterService {

  constructor() { }

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
