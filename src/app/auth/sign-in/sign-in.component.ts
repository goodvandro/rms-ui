import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from './../../activity/activity.service';
import { ErrorService } from './../../error/error.service';
import { Activity } from './../../models/activity';
import { UserService } from './../../user/user.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loading: boolean = false;
  email: string = 'root@igf.gov.st';
  password: string;
  activity = new Activity();

  constructor(
    private auth: AuthService,
    private userService: UserService,
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
    this.auth.signIn({
      email: this.email,
      password: this.password
    })
      .then(() => this.userService.setAuthorities())
      .then(() => this.createActivity())
      .then(() => this.router.navigate(['/dashboard']))
      .then(() => {
        const user = this.auth.jwtPayload.user;
        if (user.isFirst)
          this.toastr.info(`Bem vindo ${user.person.name} :)`);
        else this.toastr.info(`Bem vindo de volta, ${user.person.name} :)`);
      })
      .catch(erro => this.errorHandler.handle(erro))
      .finally(() => this.loading = false)
  }

  createActivity() {
    this.activity.description = 'autenticou-se';
    this.activity.user.id = this.auth.jwtPayload.user.id;
    this.activity.typeActivity.id = 1;

    this.activityService.create(this.activity)
  }
}
