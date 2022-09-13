import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../Models/Usuario';
import { UsuarioLogin } from '../Models/UsuarioLogin';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private subjUser$: BehaviorSubject<Usuario> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  registrarUsuario(usuarioRegistro: Usuario): Observable<Usuario> {
     const apiUrl = `${environment.urlApi}Usuarios/CadastrarUsuario`;
     return this.http.post<Usuario>(apiUrl, usuarioRegistro, httpOptions);
  }

  logarUsuario(usuarioLogin: UsuarioLogin): Observable<any> {
     const apiUrl = `${environment.urlApi}Usuarios/LoginUsuario`;
     return this.http.post<any>(apiUrl, usuarioLogin, httpOptions)
                     .pipe(tap((u: Usuario) => {
                           localStorage.setItem('TokenUsuarioLogado', u.token);
                           this.subjLoggedIn$.next(true);
                           this.subjUser$.next(u);
                      })
    );
  }

  getUser(): Observable<Usuario> {
    return this.subjUser$.asObservable();
  }

  logout() {
    localStorage.removeItem('TokenUsuarioLogado');
    localStorage.clear();
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
    // localStorage.clear();
  }
}
