import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { AuthService } from 'src/app/auth/auth.service';
import { UserSession } from 'src/app/models/user';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  userSession: UserSession;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.authService.isAccessTokenInvalid()) {
      this.userSession = this.authService.jwtPayload.user;
      const authorities = this.authService.getAuthorities();
    }
  }

  ngAfterViewInit() {
    $('.sub-menu ul').hide();
    $('.sub-menu a').click(function () {
      $(this).parent('.sub-menu').children('ul').slideToggle('100');
      $(this).find('.right').toggleClass('pi-angle-up pi-angle-down');
    });
  }

  get isDefault(): boolean {
    return this.userSession?.group.slug === 'default';
  }

  get isAdmin(): boolean {
    return this.userSession?.group.slug === 'admin';
  }

  get isAuditor(): boolean {
    return this.userSession?.group.slug === 'auditor';
  }
}
