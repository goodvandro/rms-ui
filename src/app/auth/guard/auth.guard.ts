import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isAccessTokenInvalid()) {
      console.log('Navegação com access token inválido. Obtendo novo token...');

      return this.auth.getNewAccessToken()
        .then(() => {
          if (this.auth.isAccessTokenInvalid()) {
            this.router.navigate(['/login']);
            return false;
          }

          return true;
        });
    } else if (next.data.roles && !this.auth.hasAnyPermission(next.data.roles)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }

}
