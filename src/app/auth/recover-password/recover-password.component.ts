import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/user/password.service';
import { ErrorService } from 'src/app/error/error.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  loading: boolean = false;
  email: string;
  code: string;

  constructor(
    private passwordService: PasswordService,
    private toastr: ToastrService,
    private errorService: ErrorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('recoverPasswordEmail');
  }

  recoverPassword(form: NgForm): void {
    this.loading = true;

    this.passwordService.recoverPassword({
      email: this.email,
      code: this.code
    })
      .then(() => {
        this.router.navigate(['/new-password']);
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
