import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private jwthelper: JwtHelperService, private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('TokenUsuarioLogado');

    // se o token existir e nao expirar
    if(token && !this.jwthelper.isTokenExpired(token)) {
      console.log(token);
      return true;
    }
    this.router.navigateByUrl('usuario/login');
    return false;

  }
}
