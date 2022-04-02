import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AtualizarUsuario } from '../models/AtualizarUsuario';
import { DadosLogin } from '../models/DadosLogin';
import { DadosRegistro } from '../models/DadosRegistro';

const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type' : 'application/json'
  })
};

const httpOptions2 = {
  headers: new HttpHeaders({
     'Content-Type' : 'application/json',
     'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`,
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(private http: HttpClient) { }

  salvarFoto(formData: any): Observable<any> {
        const apiUrl = `${environment.URL_API}/Usuarios/SalvarFoto`;
        return this.http.post<any>(apiUrl, formData);
  }

  registrarUsuario(dadosRegistro: DadosRegistro): Observable<any>{
     const apiUrl = `${environment.URL_API}/Usuarios/RegistrarUsuario`;
     return this.http.post<DadosRegistro>(apiUrl, dadosRegistro, httpOptions);
  }

  logarUsuario(dadosLogin: DadosLogin): Observable<any>{
     const apiUrl = `${environment.URL_API}/Usuarios/LogarUsuario`;
     return this.http.post<DadosLogin>(apiUrl, dadosLogin, httpOptions);
  }

  retornarFotoUsuario(id: string): Observable<any>{
     const apiUrl = `${environment.URL_API}/Usuarios/RetornarFotoUsuario/${id}`;
     return this.http.get<any>(apiUrl);
  }

  pegarUsuarioPeloId(id: string): Observable<AtualizarUsuario> {
     const apiUrl = `${environment.URL_API}/Usuarios/${id}`;
     return this.http.get<AtualizarUsuario>(apiUrl);
  }

  atualizarUsuario(atualizarUsuario: AtualizarUsuario): Observable<any> {
     const apiUrl = `${environment.URL_API}/Usuarios/AtualizarUsuario`;
     return this.http.put<any>(apiUrl, atualizarUsuario, httpOptions2);
  }

}
