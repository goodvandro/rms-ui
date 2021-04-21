import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../auth.service';

@Injectable()
export class AuthGuardFirstUser implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isFirst = JSON.parse(localStorage.getItem('isFirst'));

    if (isFirst) {
      this.router.navigate(['/new-password/force']);

      return false;
    }

    return true;
  }
}
