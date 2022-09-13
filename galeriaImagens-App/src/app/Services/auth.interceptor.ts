import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UsuarioService } from "./usuario.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
          private authService: UsuarioService,
          private router: Router) {}

          intercept(req: HttpRequest<any>, next: HttpHandler) {
            if (localStorage.getItem('TokenUsuarioLogado')) {
                let token = localStorage.getItem('TokenUsuarioLogado');
                const authReq = req.clone({
                    setHeaders: {
                        Authorization: token
                    }
                });
                return next.handle(authReq)
                    .pipe(catchError((error)=>{
                        console.log(error);
                        if (error instanceof HttpErrorResponse) {
                            if (error.status === 401) {
                                this.authService.logout();
                                this.router.navigateByUrl('usuario/login');
                            }
                        }
                        return throwError(error);
                    }))
            }
            return next.handle(req);
        }
}
