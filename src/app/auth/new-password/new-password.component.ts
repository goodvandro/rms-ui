import { Message } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../error/error.service';
import { User } from './../../models/user';
import { PasswordService } from './../../user/password.service';
import { AuthService } from './../auth.service';
import { decrypt } from '../../configs/crypto-js';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  loading: boolean = false;

  email: string;
  password: string;
  user = new User();

  msgs: Message[];

  constructor(
    private auth: AuthService,
    private passwordService: PasswordService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    let userId: number;

    if (this.auth.isAccessTokenInvalid()) {
      userId = Number(decrypt(this.route.snapshot.params.userId));
    } else {
      userId = this.auth.jwtPayload.user.id;
    }

    this.user.id = userId;

    this.msgs = [
      {
        severity: 'info',
        detail: 'Estamos quase lá! Agora precisa nos informar a sua nova senha. Sugerimos que seja segura e fácil de se lembrar :)'
      },
    ]
  }

  changePassword(form: NgForm) {
    this.loading = true;

    delete this.user.group;
    delete this.user.person;

    this.passwordService.changePassword(this.user)
      .then(() => {
        this.signIn();
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }

  signIn() {
    this.email = sessionStorage.getItem('recoverPasswordEmail');
    this.password = this.user.password;

    this.auth.signIn({ email: this.email, password: this.password })
      .then(() => {
        this.router.navigate(['/dashboard']);
        this.toastr.info('Bem vindo');
      })
      .catch(erro => this.errorService.handle(erro))
  }

  goBack() {
    this.location.back();
  }
}
