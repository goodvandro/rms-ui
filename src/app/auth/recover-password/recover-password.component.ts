import { Message } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from 'src/app/user/password.service';
import { ErrorService } from 'src/app/error/error.service';
import { NgForm } from '@angular/forms';
import { decrypt, encrypt } from '../../configs/crypto-js';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  loading: boolean = false;
  email: string;
  code: string;

  msgs: Message[];

  constructor(
    private passwordService: PasswordService,
    private toastr: ToastrService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.msgs = [
      {
        severity: 'info',
        detail: 'Muito bem! Enviamos um código de recuperação para o seu e-mail para termos certeza que é realmente você.'
      },
    ]

    const emailEncrypted = this.route.snapshot.params.email;
    this.email = decrypt(emailEncrypted);
  }

  recoverPassword(form: NgForm): void {
    this.loading = true;

    this.passwordService.recoverPassword({
      email: this.email,
      code: this.code
    })
      .then((user) => {
        const userIdEncrypted = encrypt(user.id.toString())
        this.router.navigate(['/new-password', userIdEncrypted]);
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
