import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NormalUserGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.user$.pipe(
        take(1),
        map(user => !!user), // <-- map to boolean
        tap(loggedIn => {
          if (!loggedIn) {
            console.log('access denied from normal user guard');
            this.router.navigate(['/login']);
          } else {
            const isNewUser = (this.auth.claims &&
              this.auth.claims.authorized.admin.length === 0 ||
              this.auth.claims.authorized.employee.length === 0);
            if (!isNewUser) {
              this.router.navigate(['/newuser']);
            }
            return isNewUser;
          }
      }));
  }

}
