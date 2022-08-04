import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../Models/Usuario';
import { UsuarioLogin } from '../Models/UsuarioLogin';

const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type' : 'application/json'
  })
};

const httpOptionsAuthorization = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  })
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  registrarUsuario(usuarioRegistro: Usuario): Observable<Usuario> {
     const apiUrl = `${environment.urlApi}Usuarios/CadastrarUsuario`;
     return this.http.post<Usuario>(apiUrl, usuarioRegistro, httpOptions);
  }

  logarUsuario(usuarioLogin: UsuarioLogin): Observable<any> {
     const apiUrl = `${environment.urlApi}Usuarios/LoginUsuario`;
     return this.http.post<any>(apiUrl, usuarioLogin, httpOptions);
  }
}
