import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DadosRegistro } from '../models/DadosRegistro';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(private http: HttpClient) { }

  salvarFoto(formData: any): Observable<any> {
        const apiUrl = `${environment.URL_API}api/Usuarios/SalvarFoto`;
        return this.http.post<any>(apiUrl, formData);
  }

  registrarUsuario(dadosRegistro: DadosRegistro): Observable<any>{
     const apiUrl = `${environment.URL_API}api/Usuarios/RegistrarUsuario`;
     return this.http.post<DadosRegistro>(apiUrl, dadosRegistro);
  }

}
