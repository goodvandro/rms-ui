import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IGF - Sistema de Recomendações';

  constructor(private router: Router) { }

  showAuth() {
    return (
      this.router.url === '/sign-in' ||
      this.router.url === '/forgot-password' ||
      this.router.url.match('/recover-password.*/') ||
      this.router.url.match('/new-password.*/') ||
      this.router.url === '/password-confirmed' ||
      this.router.url === '/new-password-force'
    );
  }
}
