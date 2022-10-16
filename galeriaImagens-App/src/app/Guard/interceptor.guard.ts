import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class InterceptorGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService,
              private router: Router) {}
  canActivate(): boolean {
    const token = localStorage.getItem('TokenUsuarioLogado');
    // se o token existir e nao expirar
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
   } else {
      this.router.navigate(['usuario/login']);
      return false;
   }
  }

}
