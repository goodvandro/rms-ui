import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  name: string;
  surname: string;
  initial: string;

  user = this.authService.jwtPayload.user;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAccessTokenInvalid()) {
      this.name = this.authService.jwtPayload.user.person.name;
      this.surname = this.authService.jwtPayload.user.person.surname;
      this.initial = (`${this.name.charAt(0)}${this.surname.charAt(0)}`).toUpperCase();
    }
  }

}
