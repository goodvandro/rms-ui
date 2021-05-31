import { User } from 'src/app/models/user';
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

  user = new User();

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAccessTokenInvalid()) {
      this.user = this.authService.jwtPayload.user;
      this.name = this.user.person.name;
      this.surname = this.user.person.surname;
      this.initial = (`${this.name.charAt(0)}${this.surname.charAt(0)}`)
        .toUpperCase();
    }
  }
}
