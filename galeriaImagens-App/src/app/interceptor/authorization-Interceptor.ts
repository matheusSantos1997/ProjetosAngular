import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../Services/usuario.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('TokenUsuarioLogado')) {
      let token = localStorage.getItem('TokenUsuarioLogado');
      const authReq = req.clone({
          setHeaders: {
              Authorization: `bearer ${token}`
          }
      });

      return next.handle(authReq)
                    .pipe(catchError((error)=>{
                        console.log(error);
                        if (error instanceof HttpErrorResponse) {
                            if (error.status === 401) {
                                this.usuarioService.logout();
                                this.router.navigateByUrl('/usuario/login');
                            }
                        }
                        return throwError(error);
                    }))
            }

      return next.handle(req);
  }
}
