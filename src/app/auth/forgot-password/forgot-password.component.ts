import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/user/password.service';
import { ErrorService } from 'src/app/error/error.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loading: boolean = false;
  email: string;

  constructor(
    private passwordService: PasswordService,
    private toastr: ToastrService,
    private errorService: ErrorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  forgotPassword(form: NgForm): void {
    this.loading = true;
    this.passwordService.forgotPassword(this.email)
      .then(() => {
        this.router.navigate(['/recover-password']);
        sessionStorage.setItem('recoverPasswordEmail', this.email)
      })
      .catch((error) => this.errorService.handle(error))
      .finally(() => this.loading = false)
  }
}
