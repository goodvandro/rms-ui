import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { ErrorService } from 'src/app/error/error.service';
import { PasswordService } from 'src/app/user/password.service';
import { encrypt } from '../../configs/crypto-js';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loading: boolean = false;
  email: string;
  msgs: Message[];

  constructor(
    private passwordService: PasswordService,
    private errorService: ErrorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.msgs = [
      {
        severity: 'info',
        detail: 'Esqueceu sua senha? Não tem problema, te ajudamos a resolver!'
      },
    ]
  }

  forgotPassword(form: NgForm): void {
    this.loading = true;
    this.passwordService.forgotPassword(this.email)
      .then(() => {
        const emailEncrypted = encrypt(this.email)
        this.router.navigate(['/recover-password', emailEncrypted])
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
