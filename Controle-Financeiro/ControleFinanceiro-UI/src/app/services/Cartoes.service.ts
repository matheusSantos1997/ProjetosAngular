import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cartao } from '../models/Cartao';

const HttpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
    })
}

@Injectable({
  providedIn: 'root'
})

export class CartoesService {

  constructor(private http: HttpClient) { }

  pegarCartaoPeloId(cartaoId: number): Observable<Cartao>{
      const apiUrl = `${environment.URL_API}/cartoes/${cartaoId}`;
      return this.http.get<Cartao>(apiUrl);
  }

  pegarCartoesPeloUsuarioId(usuarioId: string): Observable<Cartao[]>{
      const apiUrl = `${environment.URL_API}/cartoes/PegarCartoesPeloUsuarioId/${usuarioId}`;
      return this.http.get<Cartao[]>(apiUrl);
  }

  novoCartao(cartao: Cartao): Observable<any> {
      const apiUrl = `${environment.URL_API}/cartoes`;
      return this.http.post<Cartao>(apiUrl, cartao, HttpOptions);
  }

  atualizarCartao(idCartao: number, cartao: Cartao): Observable<any>{
      const apiUrl = `${environment.URL_API}/cartoes/${idCartao}`;
      return this.http.put<Cartao>(apiUrl, cartao, HttpOptions);
  }

  excluirCartao(idCartao: number): Observable<any> {
      const urlApi = `${environment.URL_API}/cartoes/${idCartao}`;
      return this.http.delete<number>(urlApi, HttpOptions);
  }

  filtrarCartoes(numeroCartao: string): Observable<Cartao[]> {
      const apiUrl = `${environment.URL_API}/cartoes/FiltrarCartoes/${numeroCartao}`;
      return this.http.get<Cartao[]>(apiUrl);

  }

}
