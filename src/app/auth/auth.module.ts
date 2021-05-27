import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from "primeng/divider";
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { environment } from 'src/environments/environment';
import { SharedModule } from './../shared/shared.module';
import { AuthRouter } from './auth.router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthGuardFirstUser } from './guard/isFirst.guard';
import { IconSystemComponent } from './icon-system/icon-system.component';
import { NewPasswordForceComponent } from './new-password-force/new-password-force.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutService } from './sign-out.service';
import { SignOutComponent } from './sign-out/sign-out.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export function tokenGetter() {
  return localStorage.getItem("igfToken");
}

@NgModule({
  declarations: [
    SignInComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    NewPasswordComponent,
    UnauthorizedComponent,
    SignOutComponent,
    NewPasswordForceComponent,
    IconSystemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRouter,
    SharedModule,

    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: environment.disallowedRoutes,
      },
    }),

    InputTextModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    ProgressBarModule,
    AvatarModule,
    OverlayPanelModule,
    MultiSelectModule,
    MessagesModule,
    MessageModule
  ],
  exports: [
    SignOutComponent
  ],
  providers: [
    AuthGuard,
    AuthGuardFirstUser,
    SignOutService
  ]
})
export class AuthModule { }
