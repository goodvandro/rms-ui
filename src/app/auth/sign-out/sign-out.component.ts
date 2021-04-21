import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/error/error.service';
import { AuthService } from '../auth.service';
import { SignOutService } from '../sign-out.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  name: string;
  surname: string;
  initial: string;

  constructor(
    private signOutService: SignOutService,
    private toastr: ToastrService,
    private errorService: ErrorService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAccessTokenInvalid()) {
      this.name = this.authService.jwtPayload.user.person.name;
      this.surname = this.authService.jwtPayload.user.person.surname;
      this.initial = (`${this.name.charAt(0)}${this.surname.charAt(0)}`).toUpperCase();
    }
  }

  signOut(): void {
    this.signOutService.signOut()
      .then(() => {
        this.router.navigate(['/sign-in']);
        this.toastr.info('Adeus!');
      })
      .catch((error) => this.errorService.handle(error))
  }
}
