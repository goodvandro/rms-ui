import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'primeng/api';
import { ErrorService } from './../../error/error.service';
import { User } from './../../models/user';
import { PasswordService } from './../../user/password.service';
import { AuthService } from './../auth.service';

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

  constructor(
    private auth: AuthService,
    private passwordService: PasswordService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user.id = this.auth.jwtPayload.user.id;
  }

  changePassword(form: NgForm) {
    this.loading = true;

    delete this.user.groups;
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
}
