import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from 'src/app/activity/activity.service';
import { Activity } from 'src/app/models/activity';
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
  activity = new Activity();

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorService,
    private router: Router,
    private toastr: ToastrService,
    private errorService: ErrorService,
    private activityService: ActivityService
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
        const user = this.auth.jwtPayload.user;
        if (user.isFirst)
          this.toastr.info(`Bem vindo ${user.person.name} :)`);
        else this.toastr.info(`Bem vindo de volta, ${user.person.name} :)`);

        this.createActivity();
      })
      .then(() => this.router.navigate(['/dashboard']))
      .catch(erro => this.errorHandler.handle(erro))
      .finally(() => this.loading = false)
  }

  createActivity() {
    this.activity.description = 'autenticou-se';
    this.activity.user.id = this.auth.jwtPayload.user.id;
    this.activity.typeActivity.id = 1;

    this.activityService.create(this.activity)
      .then(() => console.log('atividade registada!'))
      .catch((error) => this.errorService.handle(error));
  }
}
