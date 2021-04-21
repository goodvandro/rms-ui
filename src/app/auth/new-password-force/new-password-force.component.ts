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
  selector: 'app-new-password-force',
  templateUrl: './new-password-force.component.html',
  styleUrls: ['./new-password-force.component.scss']
})
export class NewPasswordForceComponent implements OnInit {
  loading: boolean = false;
  msgs: Message[];
  user = new User();

  constructor(
    private authService: AuthService,
    private passwordService: PasswordService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user.id = this.authService.jwtPayload.user.id;
    this.msgs = [
      {
        severity: 'warn',
        detail: 'Percebemos que você é novo aqui. Por favor altere a sua senha para ficar seguro.'
      },
    ];
  }

  changePassword(form: NgForm) {
    // this.validateForm(form);
    this.passwordService.changePassword(this.user)
      .then(() => {
        localStorage.removeItem('isFirst');
        localStorage.setItem('isFirst', JSON.stringify(false));
        this.router.navigate(['/dashboard']);
        this.toastr.info('Bem vindo');
      })
      .catch((error) => this.errorService.handle(error))
  }

  validateForm(formGroup: NgForm) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field)
      // const control = formGroup.get(field);
      // if (control instanceof FormControl) {
      //   control.markAsTouched({ onlySelf: true });
      // } else if (control instanceof FormGroup) {
      //   this.validateForm(control);
      // } else if (control instanceof FormArray) {
      //   control.controls.forEach(formGroup => {
      //     this.validateForm(formGroup as FormGroup);
      //   })
      // }
    });
  }
}
