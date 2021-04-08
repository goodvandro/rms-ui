import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntityLevelService {

  constructor() { }

  JSON() {
    return [
      {
        id: 1,
        name: 'Central',
      },
      {
        id: 2,
        name: 'Provincial',
      },
      {
        id: 3,
        name: 'Distrital',
      },
      {
        id: 4,
        name: 'Autárquico',
      },
    ]
  }
}
