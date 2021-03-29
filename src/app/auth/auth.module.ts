import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from "primeng/divider";
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthRouter } from './auth.router';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { PasswordConfirmedComponent } from './password-confirmed/password-confirmed.component';

@NgModule({
  declarations: [
    SignInComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    NewPasswordComponent,
    PasswordConfirmedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRouter,

    InputTextModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
  ]
})
export class AuthModule { }
