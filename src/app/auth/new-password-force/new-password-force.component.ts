import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-new-password-force',
  templateUrl: './new-password-force.component.html',
  styleUrls: ['./new-password-force.component.scss']
})
export class NewPasswordForceComponent implements OnInit {
  msgs: Message[];

  constructor() { }

  ngOnInit(): void {
    this.msgs = [
      {
        severity: 'warn',
        detail: 'Percebemos que você é novo aqui. Por favor altere a sua senha para ficar seguro.'
      },
    ];
  }

}
