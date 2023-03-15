import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.authService.isAccessTokenInvalid()) {
      this.user = this.authService.jwtPayload.user;
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
    return this.user?.group === 'default';
  }

  get isAdmin(): boolean {
    return this.user?.group === 'admin';
  }

  get isSuperAdmin(): boolean {
    return this.user?.group === 'super_admin';
  }

  get isAuditor(): boolean {
    return this.user?.person.entity.initial.toUpperCase() === 'IGF';
  }
}
