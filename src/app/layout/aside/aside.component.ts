import { Component, OnInit } from '@angular/core';
import $ from "jquery";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  user = this.authService.jwtPayload.user;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    $('.sub-menu ul').hide();
    $(".sub-menu a").click(function () {
      $(this).parent(".sub-menu").children("ul").slideToggle("100");
      $(this).find(".right").toggleClass("pi-angle-up pi-angle-down");
    });
  }

  isDefault(): boolean {
    return this.user.group === 'default';
  }

  isAdmin(): boolean {
    return this.user.group === 'admin';
  }

  isSuperAdmin(): boolean {
    return this.user.group === 'super_admin';
  }
}
