import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

       constructor(private jwtHelper: JwtHelperService,
                   private router: Router) { }

      canActivate(): boolean{
           const token = localStorage.getItem('TokenUsuarioLogado');

           // se o token existir e nao expirar
           if(token && !this.jwtHelper.isTokenExpired(token)){
              return true;
           } else {
              this.router.navigate(['usuarios/loginusuario']);
              return false;
           }
      }

      verificarAdministrador(): boolean {
          const token = localStorage.getItem('TokenUsuarioLogado');
          const tokenUsuario: any = jwtDecode(token);

          if(tokenUsuario.role === 'Administrador'){
             return true;
          } else {
             return false;
          }
      }

}
