import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../Models/Usuario';
import { UsuarioLogin } from '../Models/UsuarioLogin';

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

  logarUsuario(model: UsuarioLogin): Observable<any> {
     const apiUrl = `${environment.urlApi}Usuarios/LoginUsuario`;
     return this.http.post<Usuario>(apiUrl, model, httpOptions);
  }

  register(model: Usuario): Observable<Usuario> {
    const apiUrl = `${environment.urlApi}Usuarios/CadastrarUsuario`;
    return this.http.post<Usuario>(apiUrl, model, httpOptions);
  }

  logout(): void {
    localStorage.removeItem('TokenUsuarioLogado');
    localStorage.clear();
  }

  getUser(): Observable<Usuario> {
    return this.subjUser$.asObservable();
  }
}
