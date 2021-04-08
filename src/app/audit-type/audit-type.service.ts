import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuditTypeService {

  constructor() { }

  JSON() {
    return [
      {
        id: 1,
        name: 'Tipo 1',
      },
      {
        id: 2,
        name: 'Tipo 2',
      },
      {
        id: 3,
        name: 'Tipo 3',
      },
    ]
  }
}
