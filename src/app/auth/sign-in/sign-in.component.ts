import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loading: boolean = false;
  email: string;
  password: string;

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (!this.auth.isAccessTokenInvalid()) {
      this.router.navigate(['/dashboard']);
    }
  }

  signIn() {
    this.loading = true;
    this.auth.signIn({ email: this.email, password: this.password })
      .then(() => {
        this.router.navigate(['/dashboard']);
        this.toastr.info('Bem vindo');
      })
      .catch(erro => this.errorHandler.handle(erro))
      .finally(() => this.loading = false)
  }
}
