import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuditStatusService {

  constructor() { }

  JSON() {
    return [
      {
        id: 1,
        name: 'Aberto',
      },
      {
        id: 2,
        name: 'Em processamento',
      },
      {
        id: 3,
        name: 'Fechado',
      },
    ]
  }
}
