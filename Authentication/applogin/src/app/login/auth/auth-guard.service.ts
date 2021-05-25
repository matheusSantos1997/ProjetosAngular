import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService) { }
    
    canActivate(
            route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): Observable<boolean> 
          {
            return this.authService.isAuthenticated()
              .pipe(
                tap((b) => {
                  if (!b) {
                    this.router.navigateByUrl('/login');
                  }
                })
              )
          }
}
